using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using DapperExtensions;
using uBuildCore.Models;

namespace uBuildCore
{
    public class DbHandler
    {
        static DbHandler instance = null;
        static readonly object padlock = new object();
        private readonly string DefaultConnectionString;

        DbHandler()
        {
            DefaultConnectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].
                ConnectionString;
        }

        public static DbHandler Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new DbHandler();
                        }
                    }
                }
                return instance;
            }
        }

       

        public DbConnection GetOpenDefaultDbConnection()
        {
            var connection = new SqlConnection(DefaultConnectionString);
            connection.Open();
            return connection;
        }


        public void SaveGhlClientProfile(ClientAuths auths)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                conn.Insert(auths);
            }
        }

        public void SaveGhlClientInfos(ClientInfos auths)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                conn.Insert(auths);
            }
        }

        public ClientInfos GetGhlClientInfoByClientId(int clientId)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {

                var predicate = Predicates.Field<ClientInfos>(f => f.ClientId, Operator.Eq, clientId);
                var item = conn.GetList<ClientInfos>(predicate).FirstOrDefault();
                return item;
            }
        }

        public List<FittingsFixtures> GetFittingsFixtures()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<FittingsFixtures>().ToList();
                return list;
            }
        }
        
        public List<HouseImage> GetHouseImages()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<HouseImage>().ToList();
                return list;
            }
        }

        public ClientAuths GetClientAuthByEmail(string email)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var predicate = Predicates.Field<ClientAuths>(f => f.EmailAddress, Operator.Eq, email);
                var item = conn.GetList<ClientAuths>(predicate).FirstOrDefault();
                return item;
            }
        }

        public EligibilityChecks CheckLoanEligibility(CheckEligibilityRequest checkEligibilityRequest)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var item = conn.Query<EligibilityChecks>("spCheckEligibility", checkEligibilityRequest,commandType:CommandType.StoredProcedure).FirstOrDefault();
                return item;
            }
        }


        public int GetCurrencyId(string currency)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var item = conn.Query<int>("select recordId as 'int' from [dbo].[Currencies] where ISOCode=@currency", new { currency }).FirstOrDefault();
                return item;
            }
        }

        public int SaveLoanApplication(LoanAppls loanAppl)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var id = conn.Insert(loanAppl);
                return id;
            }
        }

        //
        //        public decimal GetInterestRateByCurrency(int currencyId)
        //        {
        //            
        //            
        //        }


        public string GenerateUlain()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var item = conn.Query("spGenerateULAIN", commandType: CommandType.StoredProcedure).FirstOrDefault();
                if (item != null)
                {
                     return item.newULAIN;
                }
                return string.Empty;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
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

        public List<FixturesAndFittings> GetFittingsFixtures()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<FixturesAndFittings>().ToList();
                return list;
            }
        }

        public List<T> GetList<T>() where T : class
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<T>().ToList();
                return list;
            }
        }

        public List<RepaymentMethods> GetRepaymentMethods()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<RepaymentMethods>().ToList();
                return list;
            }
        }

        public List<Currencies> GetCurrencies()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<Currencies>().ToList();
                return list;
            }
        }
        public List<LoanApplTypes> GetLoanApplTypes()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<LoanApplTypes>().ToList();
                return list;
            }
        }

        public List<BuildingPhases> GetBuildingPhases()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<BuildingPhases>().OrderBy(f => f.RecordId).ToList();
                return list;
            }
        }
        public List<LoanInterestRates> GetLoanInterestRates()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.GetList<LoanInterestRates>().ToList();
                return list;
            }
        }

        public List<HouseDesigns> GetHouseDesigns()
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var sql = "SELECT  hd.[RecordId], hd.[DesignName],hd.[FullDescription],hd.[BareDesignCost],hd.[CostCurrencyId],hd.[DesignImage],c.ISOCode,c.ISOSign FROM [HouseDesigns] hd inner join [dbo].Currencies c on hd.CostCurrencyId=c.RecordId";
                var list = conn.Query<HouseDesigns>(sql).ToList();
                return list;
            }
        }

        public HouseDesigns GetHouseDesignById(int id)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var sql = "SELECT  hd.[RecordId], hd.[DesignName],hd.[FullDescription],hd.[BareDesignCost],hd.[CostCurrencyId],hd.[DesignImage],c.ISOCode,c.ISOSign FROM [HouseDesigns] hd inner join  [dbo].Currencies c on hd.CostCurrencyId=c.RecordId where hd.RecordId=@id";
                var item = conn.Query<HouseDesigns>(sql, new { id }).FirstOrDefault();
                return item;
            }
        }

        public List<HouseDesignCustomizables> GetDesignCustomizablesByHouseId(int houseId)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.Query<HouseDesignCustomizables>("select hd.HouseDesignId,hd.RecordId,hd.FixturesAndFittingsId,hd.ItemCount , ff.ItemDescription,ff.UnitCost from HouseDesignCustomizables hd, FixturesAndFittings ff where hd.FixturesAndFittingsId=ff.RecordId and hd.HouseDesignId=" + houseId).ToList();
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


        public ClientInfos GetClientInfoByEmail(int clientId)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var predicate = Predicates.Field<ClientInfos>(f => f.ClientId, Operator.Eq, clientId);
                var item = conn.GetList<ClientInfos>(predicate).FirstOrDefault();
                return item;
            }
        }

        public EligibilityChecks CheckLoanEligibility(CheckEligibilityRequest checkEligibilityRequest)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var item = conn.Query<EligibilityChecks>("spCheckEligibility", checkEligibilityRequest, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public List<LoanAppls> GetMyLoanApplications(int recordId)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var predicate = Predicates.Field<LoanAppls>(f => f.ClientId, Operator.Eq, recordId);
                var list = conn.GetList<LoanAppls>(predicate);
                return list.ToList();
            }
        }


        /// <summary>
        /// Get ulains of loans applied
        /// </summary>
        /// <param name="clientId">User ClientAuth Id</param>
        /// <param name="procStage">A=All /C=Completed/	U=Uncompleted</param>
        /// <returns></returns>
        public List<string> GetClientLoanProcStages(int clientId, string procStage)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var results = conn.Query<dynamic>("spGetClientLoansProcStage", new { ClientId = clientId, ProcState = procStage }, commandType: CommandType.StoredProcedure);
                return results.Select(o => o.ULAIN).Cast<string>().ToList();
            }
        }


        public List<LoanProcessStages> GetLoanProcStagesByUlains(List<string> ulains)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var sb = new StringBuilder();
                for (int k = 0; k < ulains.Count; k++)
                {
                    if (k == 0)
                    {
                        sb.Append(string.Format("'{0}'", ulains[0]));
                    }
                    else
                    {
                        sb.Append(string.Format(",'{0}'", ulains[0]));
                    }
                }

                if (ulains.Count > 0)
                {
                    var list = conn.Query<LoanProcessStages>(string.Format(@"SELECT 
               la.[RecordId] 
              ,la.[CustomerNo]
              ,la.[ULAIN]
              ,la.[LoanApplTypeId]
              ,la.[BuildingPhaseId]
              ,la.[PurposeofLoan]
              ,la.[AmtSought]
              ,la.[CurrencyId]
	          ,c.IsoCode as 'CurrencyCode'
	          ,rm.Method as 'RepaymentMethod'
              ,la.[LoanTermMonths]
              ,la.[RepaymentMethodId]
              ,la.[ProtectionCover]
              ,la.[ProtectionSecured]
              ,la.[ProtectionSecurityType]
              ,la.[ProtectionSecurityDetails]
              ,la.[ApplSubmitted]
              ,la.[ApplSubmitDate]
	          ,ls.[LPS01InitialReview]
              ,ls.[LPS02CreditAssessment]
              ,ls.[LPS03RiskAssessment]
              ,ls.[LPS04CreditApproval]
              ,ls.[LPS05ClientConfirmation]
              ,ls.[LPS06LoanDisbursement]
              ,ls.[ProcessComment]
              ,ls.[LastProcessDate] 
	          FROM [dbo].[LoanAppls] la inner join [dbo].[LoanProcStages] ls on la.ULAIN = ls.ULAIN inner join Currencies c on 
	          la.CurrencyId = c.RecordId inner join RepaymentMethods rm on la.RepaymentMethodId = rm.RecordId where la.ULAIN in ({0})", sb.ToString()));
                    //                    var loanProcs = new List<LoanProcessStages>();
                    //                    foreach (var o in list)
                    //                    {
                    //                        loanProcs.Add(new LoanProcessStages(o));
                    //                    }
                    return list.ToList();
                }
                return new List<LoanProcessStages>();
            }
        }

        public int SaveClientDoc(LoanDocuments loanDocuments)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var id = conn.Insert(loanDocuments);
                return id;
            }
        }

        public List<LoanDocuments> GetClientDocs(string ULAIN)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var list = conn.Query<LoanDocuments>(string.Format("select * from LoanDocuments where ULAIN=@ULAIN"), new { ULAIN }).ToList();
                return list;
            }
        }

        public int SaveUnCompletedProfile(UncompletedProfile uncompleted)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var predicate = Predicates.Field<UncompletedProfile>(f => f.ClientId, Operator.Eq, uncompleted.ClientId);
                conn.Delete(predicate);
                var id = conn.Insert(uncompleted);
                return id;
            }
        }

        public UncompletedProfile GetUncompletedProfile(int clientId)
        {
            using (var conn = GetOpenDefaultDbConnection())
            {
                var predicate = Predicates.Field<UncompletedProfile>(f => f.ClientId, Operator.Eq,clientId);
                 return conn.GetList<UncompletedProfile>(predicate).FirstOrDefault();
            }
        }
    }
}

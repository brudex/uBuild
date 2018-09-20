using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;

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
    }
}

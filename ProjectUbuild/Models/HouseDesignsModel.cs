﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Models
{
    public class HouseDesignsModel
    {
        public  List<HouseDesigns> DesignRows { get; set; }

        public HouseDesignsModel()
        {
            DesignRows = new List<HouseDesigns>();
        }

        public void GetData()
        { 
            var designs= DbHandler.Instance.GetHouseDesigns();
            designs = designs.OrderByDescending(x => x.RecordId).ToList();
            DesignRows.AddRange(designs);
//            var row = new HouseDesignRow();
//            for (var i = 0; i < designs.Count; i++)
//            { 
//                if (row.Designs.Count < 5)
//                {
//                    row.Designs.Add(designs[i]);
//                }
//                else
//                {
//                    DesignRows.Add(row);
//                    row = new HouseDesignRow();
//                }
//                if (i == designs.Count - 1)
//                {
//                    DesignRows.Add(row);
//                }
//            }

        }
    }


    //public class HouseDesignRow
    //{

    //    public HouseDesignRow()
    //    {
    //        Designs = new List<HouseDesigns>();
    //    }
    //    public List<HouseDesigns> Designs { get; set; }

        

    //}
}
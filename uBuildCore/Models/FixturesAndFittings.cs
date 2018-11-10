namespace uBuildCore.Models
{
    public class FixturesAndFittings
    { 
        public int RecordId { get; set; }
        public string ItemDescription { get; set; }
        public int CustomizableFnFsId { get; set; }
        public decimal UnitCost { get; set; }
        public int CostCurrencyId { get; set; }
        public string ItemImage { get; set; }
        public bool IsDefault { get; set; }
    }
}
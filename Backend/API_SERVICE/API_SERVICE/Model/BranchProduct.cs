namespace API_SERVICE.Model
{
    public class BranchProduct
    {
        public string namephone { set; get; }
        public double pricephone { set; get; }
        public int quantityphone { set; get; }
        public double ratingphone { set; get; }
        public string urlphone { set; get; }
        public int id { set; get; }

        public int quantitysale { set; get; }
        public int inventory { set; get; }

        public int role_id { set; get; }

        public BranchProduct(string namephone, double pricephone, int quantityphone, double ratingphone, string urlphone, int id, int quantitysale, int inventory, int role_id)
        {
            this.namephone = namephone;
            this.pricephone = pricephone;
            this.quantityphone = quantityphone;
            this.ratingphone = ratingphone;
            this.urlphone = urlphone;
            this.id = id;
            this.quantitysale = quantitysale;
            this.inventory = inventory;
            this.role_id = role_id;
        }
    }
}

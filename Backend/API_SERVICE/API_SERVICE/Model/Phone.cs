using ApiService.Model;
using System.Data;

namespace API_SERVICE.Model
{
    public class Phone
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

        public static explicit operator Phone(DataRow v)
        {
            throw new NotImplementedException();
        }
        public Phone(string namephone,  int quantityphone, double pricephone,
            double ratingphone, string urlphone, int id, int quantitysale, int inventory, int role_id)
        {
            this.namephone = namephone;
            this.quantityphone = quantityphone;
            this.pricephone = pricephone;
            this.ratingphone = ratingphone;
            this.urlphone = urlphone;
            this.id = id;
            this.quantitysale = quantitysale;
            this.inventory = inventory;
            this.role_id = role_id;
        }
    }
}

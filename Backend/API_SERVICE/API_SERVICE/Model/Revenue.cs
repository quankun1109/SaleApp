using System.Data;

namespace API_SERVICE.Model
{
    public class Revenue
    {
        public string namephone { set; get; }
        public int id { set; get; }
        public double revenue { set; get; }

        public static explicit operator Revenue(DataRow v)
        {
            throw new NotImplementedException();
        }
        public Revenue(double revenue, int id, string namephone)
        {
            this.namephone = namephone;
            this.id = id;
            this.revenue = revenue;
        }
    }

}

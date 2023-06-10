using API_SERVICE.Model;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace API_SERVICE.Service
{
    public class PhoneService
    {
        private readonly IConfiguration configuration;

        public PhoneService(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        public int getPhoneQuantitySale(int id)
        {
            SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT quantitysale FROM phones where id =  " + id, con);
            DataTable dataTable = new DataTable();
            da.Fill(dataTable);

            int salequantity = 0;
            foreach (DataRow row in dataTable.Rows)
            {
                salequantity = (int)row[0];
            }
            return salequantity;
        }

        public int getPhoneQuantity(int id)
        {
            SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT quantityphone FROM phones where id =  " + id, con);
            DataTable dataTable = new DataTable();
            da.Fill(dataTable);

            int salequantity = 0;
            foreach (DataRow row in dataTable.Rows)
            {
                salequantity = (int)row[0];
            }
            return salequantity;
        }
    }
}

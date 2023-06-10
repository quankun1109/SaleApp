using API_SERVICE.Model;
using ApiService.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using API_SERVICE.Service;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ApiService.Controllers
{
    [Route("/")]
    [ApiController]
    public class PhoneController : ControllerBase
    {


        private readonly IConfiguration configuration;

        public PhoneController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        [HttpGet]
        [Route("/phones")]
        public List<Phone> getAllPhones()
        {
            SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM phones", con);
            DataTable dataTable = new DataTable();
            da.Fill(dataTable);

            List<Phone> phones = new List<Phone>();
            foreach (DataRow row in dataTable.Rows)
            {
                phones.Add(new Phone(row[0].ToString(), (int)row[1], (double)row[2], (double)row[3], 
                    row[4].ToString(), (int)row[5], (int)row[6], (int)row[7], (int)row[8])) ;
            }
            return phones;
        }

        [HttpGet]
        [Route("/phone-by-branch")]
        public List<Phone> getAllPhonesByBranch(int role_id)
        {
            SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM phones where role_id =  "+role_id, con);
            DataTable dataTable = new DataTable();
            da.Fill(dataTable);

            List<Phone> phones = new List<Phone>();
            foreach (DataRow row in dataTable.Rows)
            {
                phones.Add(new Phone(row[0].ToString(), (int)row[1], (double)row[2], (double)row[3],
                    row[4].ToString(), (int)row[5], (int)row[6], (int)row[7], (int)row[8]));
            }
            return phones;
        }
        [HttpPut]
        [Route("/{id}")]
        public int UpdateQuantity(int id, int quantity)
        { 
            try
            {
                PhoneService service = new PhoneService(configuration);
                int getQuantity = service.getPhoneQuantity(id);
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {

                    con.Open();

                    SqlCommand cmd = new SqlCommand("Update phones set quantityphone = " + getQuantity + " +@quantity where id = @id", con);
                    cmd.Parameters.AddWithValue("@quantity", quantity);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0 ? 1 : 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        
        [HttpPut]
        [Route("/quantitysale/{id}")]
        public int UpdateQuantitySale(int id, int quantity)
        {
            try
            {
                PhoneService service = new PhoneService(configuration);
                int getQuantitysale = service.getPhoneQuantitySale(id);
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("Update phones set quantitysale = "+ getQuantitysale+" + @quantity where id= @id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@quantity", quantity);
                    cmd.ExecuteNonQuery();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0 ? 1 : 0;

                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        [HttpPut]
        [Route("/inventory/{id}")]
        public int UpdateInventory(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {

                    con.Open();

                    SqlCommand cmd = new SqlCommand("update phones set inventory = (quantityphone-quantitysale) where id=@id", con);
                   
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0 ? 1 : 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        [HttpPost]
        [Route("phone-insert")]
        public IActionResult InsertUser(String name, int quantity,double price, double rating, String URL, int role_id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {

                    con.Open();
                    SqlCommand cmd = new SqlCommand("" +
                       "INSERT INTO [dbo].[phones]([namephone] ,[quantityphone] ,[pricephone] ,[ratingphone]    ,[urlphone] ,[quantitysale],[inventory]   ,[role_id]) " +
                       "VALUES      (@namephone, @quantityphone, @pricephone, @ratingphone, @urlphone,0,@quantityphone, @roleid)", con);
                    cmd.Parameters.AddWithValue("@namephone", name);
                    cmd.Parameters.AddWithValue("@quantityphone", quantity);
                    cmd.Parameters.AddWithValue("@pricephone", price);
                    cmd.Parameters.AddWithValue("@ratingphone", rating);
                    cmd.Parameters.AddWithValue("@urlphone", URL);
                    cmd.Parameters.AddWithValue("@roleid", role_id);
                    cmd.ExecuteNonQuery();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("/delete-phone/{id}")]
        public int DeletePhone(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {

                    con.Open();

                    SqlCommand cmd = new SqlCommand("delete from ProductBranch where id_phone=@id Delete from phones where id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0 ? 1 : 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

    }  
}

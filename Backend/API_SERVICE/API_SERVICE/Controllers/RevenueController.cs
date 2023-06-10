using API_SERVICE.Model;
using ApiService.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace API_SERVICE.Controllers
{
    [Route("/api")]
    [ApiController]
    public class RevenueController: Controller
    {
        private readonly IConfiguration configuration;

        public RevenueController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        [HttpGet]
        [Route("/revenue")]
        public IActionResult getRevenue(int role_id) 
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM revenue_manager where role_id = "+role_id, con);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Revenue> revenues = new List<Revenue>();
                    while (reader.Read())
                    {
                        Revenue revenue_ = new Revenue(
                             reader.GetDouble(0),
                             reader.GetInt32(1),
                             reader.GetString(2)
                        );
                        revenues.Add(revenue_);
                    }

                    return Ok(revenues);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("/roleid")]
        public IActionResult getRoleId()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("select distinct Users.role_id from Roles inner join Users on Users.role_id = Roles.role_id where Users.role_id != 0", con);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Int32> revenues = new List<Int32>();
                    while (reader.Read())
                    {
                        Int32 revenue_ = (
                             reader.GetInt32(0)
                        );
                        revenues.Add(revenue_);
                    }

                    return Ok(revenues);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}

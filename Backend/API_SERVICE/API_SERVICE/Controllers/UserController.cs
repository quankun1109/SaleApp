using ApiService.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace ApiService.Controllers
{
    [Route("/")]
    [ApiController]
    public class UserController:ControllerBase
    {
       
       
            private readonly IConfiguration configuration;

            public UserController(IConfiguration _configuration)
            {
                configuration = _configuration;
            }

        [HttpGet]
        [Route("users")]
        public IActionResult GetAllUsers()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM Users", con);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<User> users = new List<User>();
                    while (reader.Read())
                    {
                        User user = new User
                        {
                            gmail = reader.GetString(0),
                            password = reader.GetString(1),
                            role_id = reader.GetInt32(2)
                        };
                        users.Add(user);
                    }

                    return Ok(users);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("user")]
        public User Login(string email, string password)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("SELECT * FROM Users WHERE gmail = @Email AND userpassword = @Password", con);
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Password", password);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        User user = new User
                        {
                            gmail = reader["gmail"].ToString(),
                            password = reader["userpassword"].ToString(),
                            role_id = (int)reader["role_id"]
                        };
                        return user;
                    }
                    else
                    {
                        return new User("0", "0", -1);
                    }
                }
            }
            catch (Exception ex)
            {
                return new User("0", "0", -1);
            }
        }
        [HttpPost]
        [Route("user-insert")]
        public IActionResult InsertUser(String gmail, String password)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {

                    con.Open();
                    SqlCommand cmd1 = new SqlCommand("declare @branch_number int set  @branch_number = (select max(role_id) from dbo.Roles) + 1 insert into dbo.Roles (role_id, rolename) values (CAST (((select max(role_id) from dbo.Roles) + 1) AS INT),CAST( ('branch' + CAST(@branch_number AS NVARCHAR(10)) )as NVARCHAR(10)))", con);
                
                    SqlCommand cmd = new SqlCommand("INSERT INTO Users (gmail, userpassword, role_id) VALUES (@Gmail, @Password, CAST (((select max(role_id) from dbo.Roles)) AS INT))", con);
                    cmd.Parameters.AddWithValue("@Gmail", gmail);
                    cmd.Parameters.AddWithValue("@Password", password);
                    cmd1.ExecuteNonQuery();
                    cmd.ExecuteNonQuery();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

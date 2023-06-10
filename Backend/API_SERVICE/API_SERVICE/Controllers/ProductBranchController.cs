using API_SERVICE.Model;
using ApiService.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace API_SERVICE.Controllers
{
    [Route("/")]
    [ApiController]
    public class ProductBranchController:Controller
    {
        private readonly IConfiguration configuration;

        public ProductBranchController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        [HttpGet]
        [Route("/product-branch")]
        public IActionResult getBranchProduct(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(configuration.GetConnectionString("ManagerProduct").ToString()))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("select namephone, pricephone, quantityphone, ratingphone, urlphone, id, quantitysale, inventory, role_id from phones inner join ProductBranch on phones.id = ProductBranch.id_phone where ProductBranch.role_id = "+id, con);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<BranchProduct> branchProducts = new List<BranchProduct>();
                    while (reader.Read())
                    {
                        BranchProduct branchProduct = new BranchProduct(reader.GetString(0), reader.GetDouble(1),
                            reader.GetInt32(2), reader.GetDouble(3), reader.GetString(4), reader.GetInt32(5), reader.GetInt32(6), reader.GetInt32(7), reader.GetInt32(8));
      
                        branchProducts.Add(branchProduct);
                    }

                    return Ok(branchProducts);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

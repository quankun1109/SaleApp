using System.Data;

namespace ApiService.Model
{
    public class User
    {
        public string gmail { set; get; }

        public string password{ set; get; }

        public int role_id{ set; get; }

        public static explicit operator User(DataRow v)
        {
            throw new NotImplementedException();
        }
        public User(string gmail, string password, int role_id) {
            this.gmail = gmail;
            this.password = password;   
            this.role_id = role_id;
        }

        public User()
        {
            
        }

    }
}

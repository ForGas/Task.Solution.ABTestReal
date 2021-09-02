using Task_WebSolution.Context.Model;

namespace Task_WebSolution.Context.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(ApplicationDbContext context) : base(context) { }
    }
}

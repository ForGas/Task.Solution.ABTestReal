using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Task_WebSolution.Context.Model.Base;

namespace Task_WebSolution.Context.Repositories
{
    public abstract class BaseRepository<DbModel> where DbModel : BaseModel
    {
        protected ApplicationDbContext _dbContext;
        protected DbSet<DbModel> _dbSet;

        public BaseRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _dbSet = _dbContext.Set<DbModel>();
        }

        public DbModel Get(long id)
        {
            return _dbSet.SingleOrDefault(x => x.Id == id);
        }

        public List<DbModel> GetAll()
        {
            return _dbSet.ToList();
        }

        public DbModel Save(DbModel model)
        {
            if (model.Id > 0) 
                _dbSet.Update(model);
            else _dbSet.Add(model);

            _dbContext.SaveChanges();

            return model;
        }

        public List<DbModel> SaveAll(IEnumerable<DbModel> models)
        {
            _dbSet.AddRange(models);
            _dbContext.SaveChanges();

            return models.ToList();
        }

        public void Remove(DbModel model)
        {
            _dbSet.Remove(model);
            _dbContext.SaveChanges();
        }
    }
}

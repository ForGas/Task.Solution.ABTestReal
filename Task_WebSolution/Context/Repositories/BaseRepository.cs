using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Task_WebSolution.Context.Model.Base;
using System.Threading.Tasks;

namespace Task_WebSolution.Context.Repositories
{
    public abstract class BaseRepository<TDbModel> where TDbModel : BaseModel
    {
        protected readonly ApplicationDbContext _dbContext;
        protected readonly DbSet<TDbModel> _dbSet;

        protected BaseRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _dbSet = _dbContext.Set<TDbModel>();
        }

        public TDbModel? Get(long id)
        {
            return _dbSet.SingleOrDefault(x => x.Id == id);
        }

        public List<TDbModel> GetAll()
        {
            return _dbSet.ToList();
        }

        public TDbModel Save(TDbModel model)
        {
            if (model.Id > 0) 
                _dbSet.Update(model);
            else _dbSet.Add(model);

            _dbContext.SaveChanges();

            return model;
        }

        public async Task<List<TDbModel>> MultiSaveAsync(IEnumerable<TDbModel> models)
        {
            _dbSet.UpdateRange(models);
            await _dbContext.SaveChangesAsync();

            return models.ToList();
        }

        public bool Remove(TDbModel model)
        {
            _dbSet.Remove(model);
            return _dbContext.SaveChanges() > 0;
        }
    }
}

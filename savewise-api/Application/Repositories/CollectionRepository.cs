using Application.Repositories.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly IDataContext _context;

        public CollectionRepository(IDataContext context)
        {
            _context = context;

        }

        public void Add(Collection item)
        {
            throw new NotImplementedException();
        }

        public Task Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Collection> Get(Guid id)
        {
            throw new NotImplementedException();
        }





















        public async Task<List<Collection>> GetAll()
        {
            return await _context.Collections.ToListAsync();
        }

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        public Task Update(Guid id, Collection item)
        {
            throw new NotImplementedException();
        }
    }
}
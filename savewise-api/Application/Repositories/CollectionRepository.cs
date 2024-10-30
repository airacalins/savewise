using Application.Dtos;
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

        public async Task<List<Collection>> GetAll()
        {
            return await _context.Collections.ToListAsync();
        }

        public async Task<Collection> GetById(Guid id)
        {
            var collection = await _context.Collections.FindAsync(id) ?? throw new KeyNotFoundException($"Collection with ID '{id}' not found.");
            return collection;
        }

        public void Add(Collection item)
        {
            _context.Collections.Add(item);
        }

        public void Delete(Guid id)
        {
            var collection = _context.Collections.Find(id) ?? throw new KeyNotFoundException($"Collection with ID '{id}' not found.");
            _context.Collections.Remove(collection);
        }

        public void Update(Guid id, Collection item)
        {
            throw new NotImplementedException();
        }

        public void SaveChangesAsync()
        {
            _context.SaveChangesAsync();
        }

    }
}
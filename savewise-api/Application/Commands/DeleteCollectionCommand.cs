using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Application.Commands
{
    public class DeleteCollectionCommand(IDataContext context) : IDeleteCollectionCommand
    {
        private readonly IDataContext _context = context;

        public Task<Result<bool>> ExecuteCommand(Guid id)
        {
            var collection = _context.Collections.Find(id) ?? throw new KeyNotFoundException($"Collection with ID '{id}' not found.");
            _context.Collections.Remove(collection);
            _context.SaveChangesAsync();

            return Task.FromResult(Result<bool>.Success(true));
        }
    }
}
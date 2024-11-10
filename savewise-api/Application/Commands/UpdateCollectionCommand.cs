using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Commands
{
    public class UpdateCollectionCommand : IUpdateCollectionCommand
    {
        private readonly IDataContext _context;
        public UpdateCollectionCommand(IDataContext context)
        {
            _context = context;
        }

        public Task<Result<Collection>> ExecuteCommand(Guid id, UpdateCollectionDto input)
        {
            if (input.Name == null)
            {
                return Task.FromResult(Result<Collection>.Failure("Collection name is required"));
            }

            var collection = _context.Collections.FirstOrDefault(collection => collection.Id == id);

            if (collection == null)
            {
                return Task.FromResult(Result<Collection>.Failure("Collection not found"));
            }

            var isExistingCollection = _context.Collections
                .Where(c => c.CollectionType == collection.CollectionType)
                .FirstOrDefault(c => c.Name == input.Name);

            if (isExistingCollection != null)
            {
                return Task.FromResult(Result<Collection>.Failure("Collection name already exists"));
            }

            collection.Name = input.Name;

            _context.Collections.Update(collection);
            _context.SaveChangesAsync();

            return Task.FromResult(Result<Collection>.Success(collection));
        }
    }
}
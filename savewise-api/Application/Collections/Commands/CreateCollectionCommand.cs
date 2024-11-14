using Application.Collections.Dtos;
using Application.Collections.Interfaces;
using Domain.Entities;

namespace Application.Collections.Commands
{
    public class CreateCollectionCommand(IDataContext context) : ICreateCollectionCommand
    {
        private readonly IDataContext _context = context;

        public Task<Result<Collection>> ExecuteCommand(CreateCollectionDto input)
        {
            var isExistingCollection = _context.Collections
                .Where(c => c.CollectionType == input.CollectionType)
                .FirstOrDefault(collection => collection.Name == input.Name);

            if (isExistingCollection != null)
            {
                return Task.FromResult(Result<Collection>.Failure("Collection name already exists"));
            }

            var collection = input.ToCollection();

            _context.Collections.Add(collection);
            _context.SaveChangesAsync();

            return Task.FromResult(Result<Collection>.Success(collection));
        }
    }
}
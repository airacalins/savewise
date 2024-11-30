using Application.Collections.Dtos;
using Application.Collections.Interfaces;
using Domain.Entities;

namespace Application.Collections.Commands
{
    public class CreateCollectionCommand(IDataContext context) : ICreateCollectionCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<Collection>> ExecuteCommand(CreateCollectionDto input)
        {
            var isExistingCollection = _context.Collections
                .Where(c => c.CollectionType == input.CollectionType)
                .FirstOrDefault(collection => collection.Name == input.Name);

            if (isExistingCollection != null)
            {
                return Result<Collection>.Failure("Collection name already exists");
            }

            var collection = input.ToCollection();

            _context.Collections.Add(collection);
            await _context.SaveChangesAsync();

            return Result<Collection>.Success(collection);
        }
    }
}
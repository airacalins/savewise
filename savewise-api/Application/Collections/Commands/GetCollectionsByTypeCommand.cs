using Application.Collections.Interfaces;
using Application.Collections.Dtos;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Collections.Commands
{
    public class GetCollectionsByTypeCommand(IDataContext context) : IGetCollectionsByTypeCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<List<CollectionDto>>> ExecuteCommand(CollectionType collectionType)
        {
            var result = await _context.Collections.OrderBy(collection => collection.Name.ToLower()).ToListAsync();

            if (result.Count == 0)
            {
                return Result<List<CollectionDto>>.Failure("No collections found");
            }

            var data = result.Where(collection => collection.CollectionType == collectionType).Select(item => new CollectionDto(item)).ToList();

            return Result<List<CollectionDto>>.Success(data);
        }
    }
}
using System.Linq;
using Application.Dtos;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands
{
    public class GetCollectionsCommand(IDataContext context) : IGetCollectionsCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<List<CollectionDto>>> ExecuteCommand()
        {
            var collections = await _context.Collections.OrderByDescending(collection => collection.Name).ToListAsync();

            if (collections.Count == 0)
            {
                return Result<List<CollectionDto>>.Failure("No collections found");
            }

            var collectionDtos = collections.Select(item => new CollectionDto(item)).ToList();

            return Result<List<CollectionDto>>.Success(collectionDtos);
        }
    }
}
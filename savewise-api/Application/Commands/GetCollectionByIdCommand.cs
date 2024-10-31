using Application.Interfaces;
using Application.Dtos;


namespace Application.Commands
{
    public class GetCollectionByIdCommand(IDataContext context) : IGetCollectionByIdCommand
    {
        private readonly IDataContext _context = context;


        public async Task<Result<CollectionDto>> ExecuteCommand(Guid id)
        {
            var collection = await _context.Collections.FindAsync(id) ?? throw new KeyNotFoundException($"Collection with ID '{id}' not found.");

            if (collection == null)
            {
                return Result<CollectionDto>.Failure("Collection not found");
            }

            return Result<CollectionDto>.Success(new CollectionDto(collection));
        }
    }
}
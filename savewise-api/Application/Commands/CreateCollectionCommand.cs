using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Commands
{
    public class CreateCollectionCommand(IDataContext context) : ICreateCollectionCommand
    {
        private readonly IDataContext _context = context;

        public Task<Result<Collection>> ExecuteCommand(CreateCollectionDto input)
        {
            var collection = input.ToCollection();

            _context.Collections.Add(collection);
            _context.SaveChangesAsync();

            return Task.FromResult(Result<Collection>.Success(collection));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Application.Commands.Interfaces;
using Application.Dtos;
using Application.Repositories.Interfaces;

namespace Application.Commands
{
    public class GetCollectionsCommand : IGetCollectionsCommand
    {
        private readonly ICollectionRepository _collectionRepository;
        public GetCollectionsCommand(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;

        }

        public async Task<Result<List<CollectionDto>>> ExecuteCommand()
        {

            var result = await _collectionRepository.GetAll();

            var data = result.Select(item => new CollectionDto(item)).ToList();

            return Result<List<CollectionDto>>.Success(data);
        }
    }
}
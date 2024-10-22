using API.ViewModels;
using Application.Commands.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CollectionController : ControllerBase
    {
        private readonly IGetCollectionsCommand _getCollectionCommand;

        public CollectionController(IGetCollectionsCommand getCollectionCommand)
        {
            _getCollectionCommand = getCollectionCommand;
        }

        [HttpGet]
        public async Task<ActionResult<List<CollectionViewModel>>> GetCollections()
        {
            var result = await _getCollectionCommand.ExecuteCommand();

            if (!result.IsSuccess)
            {
                return BadRequest(result.Error);
            }

            var data = result.Value.Select(fund => new CollectionViewModel(fund)).ToList();

            return Ok(data);
        }
    }
}

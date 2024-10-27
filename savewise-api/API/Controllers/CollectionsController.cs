using API.ViewModels;
using Application.Commands.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CollectionsController : ControllerBase
    {
        private readonly IGetCollectionsCommand _getCollectionsCommand;

        public CollectionsController(
            IGetCollectionsCommand getCollectionsCommand
            )
        {
            _getCollectionsCommand = getCollectionsCommand;
        }

        [HttpGet]
        public async Task<ActionResult<List<CollectionViewModel>>> GetCollections()
        {
            var result = await _getCollectionsCommand.ExecuteCommand();
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(fund => new CollectionViewModel(fund)).ToList();
            return Ok(data);
        }
    }
}

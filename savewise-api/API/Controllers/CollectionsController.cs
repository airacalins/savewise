using API.ViewModels;
using Application.Commands.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CollectionsController : ControllerBase
    {
        private readonly IGetCollectionsCommand _getCollectionsCommand;
        private readonly IGetCollectionsByTypeCommand _getCollectionsByTypeCommand;
        private readonly IGetCollectionByIdCommand _getCollectionByIdCommand;

        public CollectionsController(
            IGetCollectionsCommand getCollectionsCommand,
            IGetCollectionsByTypeCommand getCollectionsByTypeCommand,
            IGetCollectionByIdCommand getCollectionByIdCommand
            )
        {
            _getCollectionsCommand = getCollectionsCommand;
            _getCollectionsByTypeCommand = getCollectionsByTypeCommand;
            _getCollectionByIdCommand = getCollectionByIdCommand;
        }

        [HttpGet]
        public async Task<ActionResult<List<CollectionViewModel>>> GetCollections()
        {
            var result = await _getCollectionsCommand.ExecuteCommand();
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(fund => new CollectionViewModel(fund)).ToList();
            return Ok(data);
        }

        [HttpGet("funds")]
        public async Task<ActionResult<List<CollectionViewModel>>> GetFundCollections()
        {
            var result = await _getCollectionsByTypeCommand.ExecuteCommand(CollectionType.Fund);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(fund => new CollectionViewModel(fund)).ToList();
            return Ok(data);
        }

        [HttpGet("expenses")]
        public async Task<ActionResult<List<CollectionViewModel>>> GetExpenseCollections()
        {
            var result = await _getCollectionsByTypeCommand.ExecuteCommand(CollectionType.Expense);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(fund => new CollectionViewModel(fund)).ToList();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionViewModel>> GetFundCollectionById([FromRoute] Guid id)
        {
            var result = await _getCollectionByIdCommand.ExecuteCommand(id);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = new CollectionViewModel(result.Value);
            return Ok(data);
        }

    }
}

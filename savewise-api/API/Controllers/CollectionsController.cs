using API.InputModels;
using API.ViewModels;
using Application.Collections.Dtos;
using Application.Collections.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CollectionsController : ControllerBase
    {
        private readonly IGetCollectionsByTypeCommand _getCollectionsByTypeCommand;
        private readonly IGetCollectionByIdCommand _getCollectionByIdCommand;
        private readonly ICreateCollectionCommand _createCollectionCommand;
        private readonly IUpdateCollectionCommand _updateCollectionCommand;
        private readonly IDeleteCollectionCommand _deleteCollectionCommand;


        public CollectionsController(
            IGetCollectionsByTypeCommand getCollectionsByTypeCommand,
            IGetCollectionByIdCommand getCollectionByIdCommand,
            ICreateCollectionCommand createCollectionCommand,
            IUpdateCollectionCommand updateCollectionCommand,
            IDeleteCollectionCommand deleteCollectionCommand
            )
        {
            _getCollectionsByTypeCommand = getCollectionsByTypeCommand;
            _getCollectionByIdCommand = getCollectionByIdCommand;
            _createCollectionCommand = createCollectionCommand;
            _updateCollectionCommand = updateCollectionCommand;
            _deleteCollectionCommand = deleteCollectionCommand;
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

        [HttpPost]
        public async Task<ActionResult<CollectionViewModel>> CreateCollection([FromBody] CreateCollectionInputModel input)
        {
            var collectionDto = input.ToCreateCollectionDto();

            var result = await _createCollectionCommand.ExecuteCommand(collectionDto);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = new CollectionDto(result.Value);

            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CollectionViewModel>> UpdateCollection([FromRoute] Guid id, [FromBody] UpdateCollectionDto input)
        {
            var result = await _updateCollectionCommand.ExecuteCommand(id, input);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = new CollectionDto(result.Value);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCollection([FromRoute] Guid id)
        {
            var result = await _deleteCollectionCommand.ExecuteCommand(id);
            if (!result.IsSuccess) return BadRequest(result.Error);

            return Ok(result.Value);
        }
    }
}

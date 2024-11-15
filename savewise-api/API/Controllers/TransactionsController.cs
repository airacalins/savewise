using API.InputModels;
using API.ViewModels;
using Application.Transactions.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TransactionsController : ControllerBase
    {
        private readonly IGetFundTransactionsByCollectionIdCommand _getFundTransactionsByCollectionIdCommand;
        private readonly ICreateFundTransactionCommand _createFundTransactionCommand;

        public TransactionsController(
            IGetFundTransactionsByCollectionIdCommand getFundTransactionsByCollectionIdCommand,
            ICreateFundTransactionCommand createFundTransactionCommand)
        {
            _getFundTransactionsByCollectionIdCommand = getFundTransactionsByCollectionIdCommand;
            _createFundTransactionCommand = createFundTransactionCommand;
        }

        [HttpGet("funds/{fundCollectionId}")]
        public async Task<ActionResult<List<TransactionViewModel>>> GetFundTransactionsByCollectionId([FromRoute] Guid fundCollectionId)
        {
            var result = await _getFundTransactionsByCollectionIdCommand.ExecuteCommand(fundCollectionId);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(transaction => new TransactionViewModel(transaction)).ToList();
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<TransactionViewModel>> CreateFundTransaction(CreateFundTransactionInputModel input)
        {
            var result = await _createFundTransactionCommand.ExecuteCommand(input.ToTransactionDto());

            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = new TransactionViewModel(result.Value);
            return Ok(data);
        }
    }
}
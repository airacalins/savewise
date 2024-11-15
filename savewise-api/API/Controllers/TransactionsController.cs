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
        public TransactionsController(IGetFundTransactionsByCollectionIdCommand getFundTransactionsByCollectionIdCommand)
        {
            _getFundTransactionsByCollectionIdCommand = getFundTransactionsByCollectionIdCommand;
        }

        [HttpGet("funds/{fundCollectionId}")]
        public async Task<ActionResult<List<TransactionViewModel>>> GetFundTransactionsByCollectionId([FromRoute] Guid fundCollectionId)
        {
            var result = await _getFundTransactionsByCollectionIdCommand.ExecuteCommand(fundCollectionId);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var data = result.Value.Select(transaction => new TransactionViewModel(transaction)).ToList();
            return Ok(data);
        }
    }
}
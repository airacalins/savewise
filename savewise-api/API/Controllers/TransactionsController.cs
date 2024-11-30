using API.InputModels;
using API.ViewModels;
using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TransactionsController(
        IGetFundTransactionsByCollectionIdCommand getFundTransactionsByCollectionIdCommand,
        ICreateFundTransactionCommand createFundTransactionCommand,
        IGetTransactionByIdCommand getTransactionByIdCommand
        ) : ControllerBase
    {
        private readonly IGetFundTransactionsByCollectionIdCommand _getFundTransactionsByCollectionIdCommand = getFundTransactionsByCollectionIdCommand;
        private readonly ICreateFundTransactionCommand _createFundTransactionCommand = createFundTransactionCommand;
        private readonly IGetTransactionByIdCommand _getTransactionByIdCommand = getTransactionByIdCommand;

        [HttpGet("funds/{fundCollectionId}")]
        public async Task<ActionResult<List<FundTransactionViewModel>>> GetFundTransactionsByCollectionId([FromRoute] Guid fundCollectionId)
        {
            var result = await _getFundTransactionsByCollectionIdCommand.ExecuteCommand(fundCollectionId);

            if (!result.IsSuccess) return BadRequest(result.Error);

            var fundTransactionsViewModel = result.Value.Select(transaction => new FundTransactionViewModel
            {
                Id = transaction.Id,
                Date = transaction.Date,
                Description = transaction.Description,
                Amount = transaction.Amount
            }).ToList();

            return Ok(fundTransactionsViewModel);
        }

        [HttpPost("funds")]
        public async Task<ActionResult<bool>> CreateFundTransaction(CreateFundTransactionInputModel input)
        {
            var result = await _createFundTransactionCommand.ExecuteCommand(new CreateTransactionDto
            {
                Date = input.Date,
                Amount = input.Amount,
                Description = input.Description,
                FundCollectionId = input.FundCollectionId
            });

            if (!result.IsSuccess) return BadRequest(result.Error);

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionViewModel>> GetTransactionById([FromRoute] Guid id)
        {
            var result = await _getTransactionByIdCommand.ExecuteCommand(id);
            if (!result.IsSuccess) return BadRequest(result.Error);

            var transactionViewModel = new TransactionViewModel
            {
                Id = result.Value.Id,
                Date = result.Value.Date,
                Description = result.Value.Description,
                Amount = result.Value.Amount,
                FundCollectionId = result.Value.FundCollectionId,
                ExpenseCollectionId = result.Value.ExpenseCollectionId,
                TransactionType = result.Value.TransactionType
            };

            return Ok(transactionViewModel);
        }
    }
}
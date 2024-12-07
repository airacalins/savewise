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
        IGetExpenseTransactionsByCollectionIdCommand getExpenseTransactionsByCollectionIdCommand,
        ICreateFundTransactionCommand createFundTransactionCommand,
        IGetTransactionByIdCommand getTransactionByIdCommand,
        IUpdateTransactionCommand updateTransactionCommand,
        IDeleteTransactionCommand deleteTransactionCommand
        ) : ControllerBase
    {
        private readonly IGetFundTransactionsByCollectionIdCommand _getFundTransactionsByCollectionIdCommand = getFundTransactionsByCollectionIdCommand;
        private readonly IGetExpenseTransactionsByCollectionIdCommand _getExpenseTransactionsByCollectionIdCommand = getExpenseTransactionsByCollectionIdCommand;
        private readonly ICreateFundTransactionCommand _createFundTransactionCommand = createFundTransactionCommand;
        private readonly IGetTransactionByIdCommand _getTransactionByIdCommand = getTransactionByIdCommand;
        private readonly IUpdateTransactionCommand _updateTransactionCommand = updateTransactionCommand;
        private readonly IDeleteTransactionCommand _deleteTransactionCommand = deleteTransactionCommand;

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

        [HttpGet("expenses/{expenseCollectionId}")]
        public async Task<ActionResult<List<ExpenseTransactionViewModel>>> GetExpenseTransactionsByCollectionId([FromRoute] Guid expenseCollectionId)
        {
            var result = await _getExpenseTransactionsByCollectionIdCommand.ExecuteCommand(expenseCollectionId);

            if (!result.IsSuccess) return BadRequest(result.Error);

            var expenseTransactionsViewModel = result.Value.Select(transaction => new ExpenseTransactionViewModel
            {
                Id = transaction.Id,
                Date = transaction.Date,
                Description = transaction.Description,
                Amount = transaction.Amount,
                FundCollectionId = transaction.FundCollectionId,
                ExpenseCollectionId = transaction.ExpenseCollectionId
            }).ToList();

            return Ok(expenseTransactionsViewModel);
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

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> UpdateTransaction([FromRoute] Guid id, [FromBody] UpdateTransactionDto input)
        {
            var result = await _updateTransactionCommand.ExecuteCommand(id, input);
            if (!result.IsSuccess) return BadRequest(result.Error);

            return Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteTransaction([FromRoute] Guid id)
        {
            var result = await _deleteTransactionCommand.ExecuteCommand(id);
            if (!result.IsSuccess) return BadRequest(result.Error);

            return Ok(result.Value);
        }
    }
}
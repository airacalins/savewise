using API.InputModels;
using API.ViewModels;
using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Entities;
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
    }
}
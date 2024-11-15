using Application.Transactions.Dtos;

namespace API.InputModels
{
    public class CreateFundTransactionInputModel
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }

        public CreateFundTransactionDto ToTransactionDto()
        {
            return new CreateFundTransactionDto
            {
                Date = Date,
                Description = Description,
                Amount = Amount,
                FundCollectionId = FundCollectionId,
            };
        }
    }
}
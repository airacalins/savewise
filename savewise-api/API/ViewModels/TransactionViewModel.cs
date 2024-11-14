using Application.Collections.Dtos;
using Application.Transactions.Dtos;

namespace API.ViewModels
{
    public class TransactionViewModel
    {
        public TransactionViewModel(TransactionDto transactionDto)
        {
            Id = transactionDto.Id;
            Description = transactionDto.Description;
            Amount = transactionDto.Amount;
            FundCollectionId = transactionDto.FundCollectionId;
            FundCollection = new CollectionViewModel(transactionDto.FundCollection);
            ExpenseCollectiondId = transactionDto.ExpenseCollectiondId;
            ExpenseCollectionId = new CollectionViewModel(transactionDto.ExpenseCollectionId);
            CreatedAt = transactionDto.CreatedAt;
        }

        public Guid Id { get; set; }
        public required string Description { get; set; }
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public required CollectionViewModel FundCollection { get; set; }
        public Guid ExpenseCollectiondId { get; set; }
        public required CollectionViewModel ExpenseCollectionId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
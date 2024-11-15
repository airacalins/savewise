using Application.Transactions.Dtos;
using Domain.Entities;
using Domain.Enums;

namespace API.ViewModels
{
    public class TransactionViewModel
    {
        public TransactionViewModel(TransactionDto transactionDto)
        {
            Id = transactionDto.Id;
            Date = transactionDto.Date;
            Description = transactionDto.Description;
            Amount = transactionDto.Amount;
            FundCollectionId = transactionDto.FundCollectionId;
            FundCollection = transactionDto.FundCollection;
            TransactionType = transactionDto.TransactionType;
        }

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public Collection FundCollection { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}
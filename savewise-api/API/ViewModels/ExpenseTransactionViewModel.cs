using Domain.Enums;

namespace API.ViewModels
{
    public class ExpenseTransactionViewModel
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public Guid? ExpenseCollectionId { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}
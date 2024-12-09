namespace API.InputModels
{
    public class CreateExpenseTransactionInputModel
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public Guid? ExpenseCollectionId { get; set; }
    }
}
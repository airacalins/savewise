namespace API.ViewModels
{
    public class FundTransactionViewModel
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
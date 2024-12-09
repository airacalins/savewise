namespace API.InputModels
{
    public class CreateFundTransactionInputModel
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public Guid FundCollectionId { get; set; }
    }
}
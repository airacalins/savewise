using Domain.Enums;

namespace Domain.Entities
{
    public class Collection
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; } = string.Empty;

        public CollectionType CollectionType { get; set; }

        public double CurrentMonthTotal { get; set; }

        public double YearToDateTotal { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
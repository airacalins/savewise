using Domain.Entities;
using Domain.Enums;

namespace Application.Dtos
{
    public class CollectionDto
    {
        public CollectionDto(Collection collection)
        {
            Id = collection.Id;
            Date = collection.Date;
            CollectionType = collection.CollectionType;
            CurrentMonthTotal = collection.CurrentMonthTotal;
            YearToDateTotal = collection.YearToDateTotal;
            CreatedAt = collection.CreatedAt;
        }

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public CollectionType CollectionType { get; set; }
        public double CurrentMonthTotal { get; set; }
        public double YearToDateTotal { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
using Domain.Entities;
using Domain.Enums;

namespace Application.Collections.Dtos
{
    public class CollectionDto(Collection collection)
    {
        public Guid Id { get; set; } = collection.Id;
        public DateTime Date { get; set; } = collection.Date;
        public string Name { get; set; } = collection.Name;
        public CollectionType CollectionType { get; set; } = collection.CollectionType;
        public double CurrentMonthTotal { get; set; } = collection.CurrentMonthTotal;
        public double YearToDateTotal { get; set; } = collection.YearToDateTotal;
        public DateTime CreatedAt { get; set; } = collection.CreatedAt;
    }
}
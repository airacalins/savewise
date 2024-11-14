using Application.Collections.Dtos;
using Domain.Enums;

namespace API.ViewModels
{
    public class CollectionViewModel
    {
        public CollectionViewModel(CollectionDto collectionDto)
        {
            Id = collectionDto.Id;
            Date = collectionDto.Date;
            Name = collectionDto.Name;
            CollectionType = collectionDto.CollectionType;
            CurrentMonthTotal = collectionDto.CurrentMonthTotal;
            YearToDateTotal = collectionDto.YearToDateTotal;
            CreatedAt = collectionDto.CreatedAt;
        }

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; } = string.Empty;
        public CollectionType CollectionType { get; set; }
        public double CurrentMonthTotal { get; set; }
        public double YearToDateTotal { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
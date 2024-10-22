using Application.Dtos;
using Domain.Enums;

namespace API.ViewModels
{
    public class CollectionViewModel
    {
        public CollectionViewModel(CollectionDto collectionDto)
        {
            Id = collectionDto.Id;
            Date = collectionDto.Date;
            CollectionType = collectionDto.CollectionType;
            CurrentMonthTotal = collectionDto.CurrentMonthTotal;
            YearToDateTotal = collectionDto.YearToDateTotal;
            CreatedAt = collectionDto.CreatedAt;
        }

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public CollectionType CollectionType { get; set; }
        public double CurrentMonthTotal { get; set; }
        public double YearToDateTotal { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
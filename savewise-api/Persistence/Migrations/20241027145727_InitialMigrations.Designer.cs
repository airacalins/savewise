﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241027145727_InitialMigrations")]
    partial class InitialMigrations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Domain.Entities.Collection", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CollectionType")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<double>("CurrentMonthTotal")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("YearToDateTotal")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Collections");

                    b.HasData(
                        new
                        {
                            Id = new Guid("3b00dca3-2aa1-43a5-9d30-03500c642fd8"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6660),
                            CurrentMonthTotal = 5000.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6630),
                            Name = "Emergency",
                            YearToDateTotal = 30000.0
                        },
                        new
                        {
                            Id = new Guid("23b85a79-3c20-4c2a-8bab-5aaaaabee782"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670),
                            CurrentMonthTotal = 12000.0,
                            Date = new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670),
                            Name = "Retirement",
                            YearToDateTotal = 60000.0
                        },
                        new
                        {
                            Id = new Guid("301063be-1716-42dc-8e26-ecc252d471e5"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680),
                            CurrentMonthTotal = 8000.0,
                            Date = new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670),
                            Name = "Investment",
                            YearToDateTotal = 50000.0
                        },
                        new
                        {
                            Id = new Guid("24f08ee6-4539-4941-9dcb-dab932d21c78"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 7, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680),
                            CurrentMonthTotal = 3000.0,
                            Date = new DateTime(2024, 7, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680),
                            Name = "Vacation",
                            YearToDateTotal = 15000.0
                        },
                        new
                        {
                            Id = new Guid("cc5c06d1-8a4b-4cee-8c4d-fe237b43207b"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 6, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690),
                            CurrentMonthTotal = 7000.0,
                            Date = new DateTime(2024, 6, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680),
                            Name = "Education",
                            YearToDateTotal = 35000.0
                        },
                        new
                        {
                            Id = new Guid("550e4e53-f9e0-4a6a-941b-cf31c6482944"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 5, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690),
                            CurrentMonthTotal = 9000.0,
                            Date = new DateTime(2024, 5, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690),
                            Name = "Business",
                            YearToDateTotal = 40000.0
                        },
                        new
                        {
                            Id = new Guid("c32a390d-9c3b-4170-b870-9e8eb347932d"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 4, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700),
                            CurrentMonthTotal = 6000.0,
                            Date = new DateTime(2024, 4, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690),
                            Name = "Health",
                            YearToDateTotal = 28000.0
                        },
                        new
                        {
                            Id = new Guid("0d8524fb-3d0c-4634-a716-ff49135c009b"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700),
                            CurrentMonthTotal = 1500.75,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700),
                            Name = "Utilities",
                            YearToDateTotal = 12000.0
                        },
                        new
                        {
                            Id = new Guid("06012527-39ac-460d-a8a5-2870502b2183"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710),
                            CurrentMonthTotal = 3000.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700),
                            Name = "Living Expenses",
                            YearToDateTotal = 25000.0
                        },
                        new
                        {
                            Id = new Guid("f698a339-d97e-45a3-9f27-209580bd1c50"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710),
                            CurrentMonthTotal = 2000.5,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710),
                            Name = "Savings",
                            YearToDateTotal = 18000.0
                        },
                        new
                        {
                            Id = new Guid("db8205ef-3fe6-4292-8f5b-23e2d9b81f88"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710),
                            CurrentMonthTotal = 1200.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710),
                            Name = "Travel",
                            YearToDateTotal = 10000.0
                        },
                        new
                        {
                            Id = new Guid("468097e8-8ac0-4ee6-b3d5-55c5d80eedd1"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720),
                            CurrentMonthTotal = 800.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720),
                            Name = "Entertainment",
                            YearToDateTotal = 7000.0
                        },
                        new
                        {
                            Id = new Guid("44b8d408-5793-4e63-bf03-5fe486301661"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720),
                            CurrentMonthTotal = 900.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720),
                            Name = "Groceries",
                            YearToDateTotal = 8000.0
                        },
                        new
                        {
                            Id = new Guid("05ce9e5b-d4c5-4fa6-8242-8a2980e920fd"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730),
                            CurrentMonthTotal = 650.25,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730),
                            Name = "Healthcare",
                            YearToDateTotal = 5000.0
                        },
                        new
                        {
                            Id = new Guid("2ae740a9-b63d-4024-9f9d-3fdc57a7030f"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730),
                            CurrentMonthTotal = 1300.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730),
                            Name = "Education",
                            YearToDateTotal = 11000.0
                        },
                        new
                        {
                            Id = new Guid("28127989-ea8d-400e-8c2a-31efebd6835d"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740),
                            CurrentMonthTotal = 400.0,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730),
                            Name = "Miscellaneous",
                            YearToDateTotal = 3000.0
                        },
                        new
                        {
                            Id = new Guid("609ee40a-5cd2-4416-aaca-d4c342a861b7"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740),
                            CurrentMonthTotal = 600.5,
                            Date = new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740),
                            Name = "Insurance",
                            YearToDateTotal = 4500.0
                        },
                        new
                        {
                            Id = new Guid("ac37e384-5e24-4a30-a629-936fed53e9cb"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750),
                            CurrentMonthTotal = 10000.0,
                            Date = new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750),
                            Name = "Emergency Fund",
                            YearToDateTotal = 50000.0
                        },
                        new
                        {
                            Id = new Guid("8e0d34fb-e32b-4cab-a2a6-76e225b1de2e"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750),
                            CurrentMonthTotal = 15000.0,
                            Date = new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750),
                            Name = "Retirement Fund",
                            YearToDateTotal = 70000.0
                        });
                });

            modelBuilder.Entity("Domain.Entities.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<double>("Amount")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ExpenseCollectionIdId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ExpenseCollectiondId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FundCollectionId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseCollectionIdId");

                    b.HasIndex("FundCollectionId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Domain.Entities.Transaction", b =>
                {
                    b.HasOne("Domain.Entities.Collection", "ExpenseCollectionId")
                        .WithMany()
                        .HasForeignKey("ExpenseCollectionIdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Collection", "FundCollection")
                        .WithMany()
                        .HasForeignKey("FundCollectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ExpenseCollectionId");

                    b.Navigation("FundCollection");
                });
#pragma warning restore 612, 618
        }
    }
}

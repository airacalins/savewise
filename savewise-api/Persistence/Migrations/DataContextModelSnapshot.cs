﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<double>("YearToDateTotal")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Collections");

                    b.HasData(
                        new
                        {
                            Id = new Guid("ac291e35-3876-4bb8-8c7e-01da4a2097f7"),
                            CollectionType = 1,
                            CreatedAt = new DateTime(2024, 10, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6050),
                            CurrentMonthTotal = 5000.0,
                            Date = new DateTime(2024, 10, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6010),
                            YearToDateTotal = 30000.0
                        },
                        new
                        {
                            Id = new Guid("ef60bdd3-1df8-446e-9ccb-997efb0952b2"),
                            CollectionType = 0,
                            CreatedAt = new DateTime(2024, 9, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6070),
                            CurrentMonthTotal = 10000.0,
                            Date = new DateTime(2024, 9, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6070),
                            YearToDateTotal = 50000.0
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
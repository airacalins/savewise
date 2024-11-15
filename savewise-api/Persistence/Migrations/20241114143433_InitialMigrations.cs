using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    CollectionType = table.Column<int>(type: "INTEGER", nullable: false),
                    CurrentMonthTotal = table.Column<double>(type: "REAL", nullable: false),
                    YearToDateTotal = table.Column<double>(type: "REAL", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Amount = table.Column<double>(type: "REAL", nullable: false),
                    FundCollectionId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ExpenseCollectionId = table.Column<Guid>(type: "TEXT", nullable: true),
                    TransactionType = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Collections_ExpenseCollectionId",
                        column: x => x.ExpenseCollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Transactions_Collections_FundCollectionId",
                        column: x => x.FundCollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Collections",
                columns: new[] { "Id", "CollectionType", "CreatedAt", "CurrentMonthTotal", "Date", "Name", "YearToDateTotal" },
                values: new object[,]
                {
                    { new Guid("013eb7a6-bace-41bb-966a-a5dfb11bdfe6"), 0, new DateTime(2024, 10, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4160), 12000.0, new DateTime(2024, 10, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4150), "Retirement", 60000.0 },
                    { new Guid("17f6da93-33aa-41d7-90e3-4e2629a666ab"), 0, new DateTime(2024, 6, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4190), 9000.0, new DateTime(2024, 6, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4190), "Business", 40000.0 },
                    { new Guid("2e33491f-0e02-4de8-b150-4306c05323a6"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4230), 400.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4230), "Miscellaneous", 3000.0 },
                    { new Guid("48aef32a-0d95-43ac-94d5-a982b2abddd2"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4220), 900.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4220), "Groceries", 8000.0 },
                    { new Guid("4e6bf374-269c-4805-85d1-0760ea0b6831"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4200), 3000.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4200), "Living Expenses", 25000.0 },
                    { new Guid("50f18adb-764c-4bc3-8c2c-323ea7b2e7b9"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4230), 1300.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4220), "Education", 11000.0 },
                    { new Guid("62733967-65e7-4859-97b2-9e078da0a8fe"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4210), 1200.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4210), "Travel", 10000.0 },
                    { new Guid("71790a14-6074-4d68-a114-a6f299e7f13f"), 0, new DateTime(2024, 9, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4240), 15000.0, new DateTime(2024, 9, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4240), "Retirement Fund", 70000.0 },
                    { new Guid("7f8067a6-b14b-4a06-a555-c6f36b6e336d"), 0, new DateTime(2024, 7, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4190), 7000.0, new DateTime(2024, 7, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4180), "Education", 35000.0 },
                    { new Guid("861b326c-225d-445d-ad2a-78f7cbdd8e4b"), 0, new DateTime(2024, 10, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4240), 10000.0, new DateTime(2024, 10, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4240), "Emergency Fund", 50000.0 },
                    { new Guid("8b0bf32a-305c-409a-b681-36652caa6996"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4200), 1500.75, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4200), "Utilities", 12000.0 },
                    { new Guid("8f518db6-44f7-4b0f-83e5-c29f474eb681"), 0, new DateTime(2024, 9, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4160), 8000.0, new DateTime(2024, 9, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4160), "Investment", 50000.0 },
                    { new Guid("b255647d-e73d-4e16-96e9-4a98f4a8e449"), 0, new DateTime(2024, 8, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4170), 3000.0, new DateTime(2024, 8, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4170), "Vacation", 15000.0 },
                    { new Guid("b9e71397-917b-4b92-a625-eddb01888db6"), 0, new DateTime(2024, 5, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4190), 6000.0, new DateTime(2024, 5, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4190), "Health", 28000.0 },
                    { new Guid("bc32ff64-4146-41da-916a-f69bc7752b42"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4230), 600.5, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4230), "Insurance", 4500.0 },
                    { new Guid("cbd6cd10-58c3-4a2a-9bdc-f9aa3d673a68"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4210), 800.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4210), "Entertainment", 7000.0 },
                    { new Guid("ce2b8d8f-b2a6-42b2-a0e8-6dba415cd341"), 0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4150), 5000.0, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4120), "Emergency", 30000.0 },
                    { new Guid("cfc2aa39-7e43-4423-b44d-aa5fae30941a"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4220), 650.25, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4220), "Healthcare", 5000.0 },
                    { new Guid("e68a33fa-786a-4475-9894-9adc7c5b7170"), 1, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4210), 2000.5, new DateTime(2024, 11, 14, 22, 34, 33, 550, DateTimeKind.Local).AddTicks(4200), "Savings", 18000.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ExpenseCollectionId",
                table: "Transactions",
                column: "ExpenseCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_FundCollectionId",
                table: "Transactions",
                column: "FundCollectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Collections");
        }
    }
}

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
                    ExpenseCollectiondId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ExpenseCollectionIdId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Collections_ExpenseCollectionIdId",
                        column: x => x.ExpenseCollectionIdId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    { new Guid("05ce9e5b-d4c5-4fa6-8242-8a2980e920fd"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730), 650.25, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730), "Healthcare", 5000.0 },
                    { new Guid("06012527-39ac-460d-a8a5-2870502b2183"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710), 3000.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700), "Living Expenses", 25000.0 },
                    { new Guid("0d8524fb-3d0c-4634-a716-ff49135c009b"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700), 1500.75, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700), "Utilities", 12000.0 },
                    { new Guid("23b85a79-3c20-4c2a-8bab-5aaaaabee782"), 0, new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670), 12000.0, new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670), "Retirement", 60000.0 },
                    { new Guid("24f08ee6-4539-4941-9dcb-dab932d21c78"), 0, new DateTime(2024, 7, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680), 3000.0, new DateTime(2024, 7, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680), "Vacation", 15000.0 },
                    { new Guid("28127989-ea8d-400e-8c2a-31efebd6835d"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740), 400.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730), "Miscellaneous", 3000.0 },
                    { new Guid("2ae740a9-b63d-4024-9f9d-3fdc57a7030f"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730), 1300.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6730), "Education", 11000.0 },
                    { new Guid("301063be-1716-42dc-8e26-ecc252d471e5"), 0, new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680), 8000.0, new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6670), "Investment", 50000.0 },
                    { new Guid("3b00dca3-2aa1-43a5-9d30-03500c642fd8"), 0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6660), 5000.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6630), "Emergency", 30000.0 },
                    { new Guid("44b8d408-5793-4e63-bf03-5fe486301661"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720), 900.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720), "Groceries", 8000.0 },
                    { new Guid("468097e8-8ac0-4ee6-b3d5-55c5d80eedd1"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720), 800.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6720), "Entertainment", 7000.0 },
                    { new Guid("550e4e53-f9e0-4a6a-941b-cf31c6482944"), 0, new DateTime(2024, 5, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690), 9000.0, new DateTime(2024, 5, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690), "Business", 40000.0 },
                    { new Guid("609ee40a-5cd2-4416-aaca-d4c342a861b7"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740), 600.5, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6740), "Insurance", 4500.0 },
                    { new Guid("8e0d34fb-e32b-4cab-a2a6-76e225b1de2e"), 0, new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750), 15000.0, new DateTime(2024, 8, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750), "Retirement Fund", 70000.0 },
                    { new Guid("ac37e384-5e24-4a30-a629-936fed53e9cb"), 0, new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750), 10000.0, new DateTime(2024, 9, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6750), "Emergency Fund", 50000.0 },
                    { new Guid("c32a390d-9c3b-4170-b870-9e8eb347932d"), 0, new DateTime(2024, 4, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6700), 6000.0, new DateTime(2024, 4, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690), "Health", 28000.0 },
                    { new Guid("cc5c06d1-8a4b-4cee-8c4d-fe237b43207b"), 0, new DateTime(2024, 6, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6690), 7000.0, new DateTime(2024, 6, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6680), "Education", 35000.0 },
                    { new Guid("db8205ef-3fe6-4292-8f5b-23e2d9b81f88"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710), 1200.0, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710), "Travel", 10000.0 },
                    { new Guid("f698a339-d97e-45a3-9f27-209580bd1c50"), 1, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710), 2000.5, new DateTime(2024, 10, 27, 22, 57, 27, 338, DateTimeKind.Local).AddTicks(6710), "Savings", 18000.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ExpenseCollectionIdId",
                table: "Transactions",
                column: "ExpenseCollectionIdId");

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

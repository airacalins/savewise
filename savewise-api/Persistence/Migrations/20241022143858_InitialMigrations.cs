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
                columns: new[] { "Id", "CollectionType", "CreatedAt", "CurrentMonthTotal", "Date", "YearToDateTotal" },
                values: new object[,]
                {
                    { new Guid("ac291e35-3876-4bb8-8c7e-01da4a2097f7"), 1, new DateTime(2024, 10, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6050), 5000.0, new DateTime(2024, 10, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6010), 30000.0 },
                    { new Guid("ef60bdd3-1df8-446e-9ccb-997efb0952b2"), 0, new DateTime(2024, 9, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6070), 10000.0, new DateTime(2024, 9, 22, 22, 38, 58, 489, DateTimeKind.Local).AddTicks(6070), 50000.0 }
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

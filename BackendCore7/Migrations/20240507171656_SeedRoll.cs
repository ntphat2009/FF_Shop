using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4cec1ff1-5bd5-4a15-823c-4cbb1d6c6cbc", "3", "HR", "HR" },
                    { "d765e731-33f0-478e-bc15-f9f1ac20b28d", "2", "User", "User" },
                    { "f3670d30-4cbb-4468-87b2-56e2b89faef3", "1", "Admin", "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4cec1ff1-5bd5-4a15-823c-4cbb1d6c6cbc");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d765e731-33f0-478e-bc15-f9f1ac20b28d");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f3670d30-4cbb-4468-87b2-56e2b89faef3");
        }
    }
}

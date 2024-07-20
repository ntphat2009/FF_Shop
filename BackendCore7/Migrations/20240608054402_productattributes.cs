using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class productattributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "09bd4c4e-c503-4455-b295-ea174e478526");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "20618fb0-5490-4c4d-bc8b-b5fd9b4ba15c");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "977124c7-567c-455c-b6c4-36f136de40cc");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "29398ebe-baeb-4b39-905c-1befd930326e", "2", "User", "User" },
                    { "3132a72c-86b7-47dd-b9a8-f733a45197ed", "1", "Admin", "Admin" },
                    { "9bfa16f1-7a6f-4d23-9c20-e6067864a3a0", "3", "HR", "HR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "29398ebe-baeb-4b39-905c-1befd930326e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3132a72c-86b7-47dd-b9a8-f733a45197ed");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "9bfa16f1-7a6f-4d23-9c20-e6067864a3a0");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "09bd4c4e-c503-4455-b295-ea174e478526", "3", "HR", "HR" },
                    { "20618fb0-5490-4c4d-bc8b-b5fd9b4ba15c", "1", "Admin", "Admin" },
                    { "977124c7-567c-455c-b6c4-36f136de40cc", "2", "User", "User" }
                });
        }
    }
}

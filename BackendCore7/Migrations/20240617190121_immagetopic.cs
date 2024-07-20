using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class immagetopic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "602f0f57-7ff5-4d52-b8f7-6bf75617f24b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c2fa56ae-516d-41ee-b010-f2c8a24576aa");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c404415b-bd9a-46dc-b9b4-e59fc6eef000");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Contacts",
                type: "nvarchar(max)",
                maxLength: 2147483647,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "abe01b91-9cde-49d4-9929-8f0689db6241", "1", "Admin", "Admin" },
                    { "e6372c79-83ab-4d83-a814-b5ffc570458e", "3", "HR", "HR" },
                    { "ff8aaea9-9372-45eb-980b-543fafaadda9", "2", "User", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "abe01b91-9cde-49d4-9929-8f0689db6241");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "e6372c79-83ab-4d83-a814-b5ffc570458e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ff8aaea9-9372-45eb-980b-543fafaadda9");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Topics");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Contacts",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldMaxLength: 2147483647);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "602f0f57-7ff5-4d52-b8f7-6bf75617f24b", "2", "User", "User" },
                    { "c2fa56ae-516d-41ee-b010-f2c8a24576aa", "3", "HR", "HR" },
                    { "c404415b-bd9a-46dc-b9b4-e59fc6eef000", "1", "Admin", "Admin" }
                });
        }
    }
}

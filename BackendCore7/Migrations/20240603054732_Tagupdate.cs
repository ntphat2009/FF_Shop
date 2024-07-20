using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class Tagupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "5e34ee3c-8149-49c2-8002-af8aa68d2632");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8cb27961-a573-4aaf-879c-7e6abb8056da");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b630c5de-9471-46ff-b7d3-0705f0426485");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Tags",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "609adcc6-9fa3-4673-a2cf-188bf0d6d398", "1", "Admin", "Admin" },
                    { "ceb03467-17f5-4de7-96da-a7a4ea85bda2", "2", "User", "User" },
                    { "f57b6756-af31-4127-8e5d-affd0a31dc05", "3", "HR", "HR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "609adcc6-9fa3-4673-a2cf-188bf0d6d398");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ceb03467-17f5-4de7-96da-a7a4ea85bda2");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f57b6756-af31-4127-8e5d-affd0a31dc05");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Tags");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5e34ee3c-8149-49c2-8002-af8aa68d2632", "2", "User", "User" },
                    { "8cb27961-a573-4aaf-879c-7e6abb8056da", "3", "HR", "HR" },
                    { "b630c5de-9471-46ff-b7d3-0705f0426485", "1", "Admin", "Admin" }
                });
        }
    }
}

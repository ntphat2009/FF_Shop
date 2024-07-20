using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class role : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DeleteData(
            //    table: "Roles",
            //    keyColumn: "Id",
            //    keyValue: "82b1456f-7e4d-48dd-b581-43237f2be15b");

            //migrationBuilder.DeleteData(
            //    table: "Roles",
            //    keyColumn: "Id",
            //    keyValue: "88c17ae0-ac77-494b-aa42-39ca6c3a2170");

            //migrationBuilder.DeleteData(
            //    table: "Roles",
            //    keyColumn: "Id",
            //    keyValue: "a60891bb-0865-4e4c-879b-487841d8cfad");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "82b1456f-7e4d-48dd-b581-43237f2be15b", "3", "HR", "HR" },
                    { "88c17ae0-ac77-494b-aa42-39ca6c3a2170", "2", "User", "User" },
                    { "a60891bb-0865-4e4c-879b-487841d8cfad", "1", "Admin", "Admin" }
                });
        }
    }
}

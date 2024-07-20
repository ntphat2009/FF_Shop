using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class resetpasscodedb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0b6a91cc-b7e4-4688-bdd9-bbb87a9866c0");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "51a6d27a-781e-4e18-99d5-4199f3c22c74");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "88f0fdf7-0fa2-4d62-8e1c-a8e15c7b2993");

            migrationBuilder.CreateTable(
                name: "resetPasswordCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    expireCode = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resetPasswordCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_resetPasswordCodes_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1bc432d0-b979-4d19-9beb-7e504fd273fb", "3", "HR", "HR" },
                    { "5bcd611f-28fd-4e0d-b47f-3544914ac8f8", "2", "User", "User" },
                    { "8f48a6cb-989f-4888-b103-159ece251ebf", "1", "Admin", "Admin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_resetPasswordCodes_UsersId",
                table: "resetPasswordCodes",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "resetPasswordCodes");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "1bc432d0-b979-4d19-9beb-7e504fd273fb");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "5bcd611f-28fd-4e0d-b47f-3544914ac8f8");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "8f48a6cb-989f-4888-b103-159ece251ebf");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b6a91cc-b7e4-4688-bdd9-bbb87a9866c0", "3", "HR", "HR" },
                    { "51a6d27a-781e-4e18-99d5-4199f3c22c74", "1", "Admin", "Admin" },
                    { "88f0fdf7-0fa2-4d62-8e1c-a8e15c7b2993", "2", "User", "User" }
                });
        }
    }
}

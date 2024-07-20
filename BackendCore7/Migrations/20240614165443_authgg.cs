using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class authgg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "031cffdd-5420-4712-8bab-034a6437cb9a");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "304ae92d-f20f-4c8f-8f86-279cbbc18fa5");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "89fcaf35-956d-45b5-a090-b5f339eac1cc");

            migrationBuilder.AddColumn<string>(
                name: "GoogleId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "034c4838-d074-4833-b72d-3e10a759e4b6", "1", "Admin", "Admin" },
                    { "adac0a21-246c-4b38-a56c-5bb6b7551559", "3", "HR", "HR" },
                    { "b0af589f-c38d-4b62-8fbb-8f8d7e1919ea", "2", "User", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "034c4838-d074-4833-b72d-3e10a759e4b6");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "adac0a21-246c-4b38-a56c-5bb6b7551559");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b0af589f-c38d-4b62-8fbb-8f8d7e1919ea");

            migrationBuilder.DropColumn(
                name: "GoogleId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "031cffdd-5420-4712-8bab-034a6437cb9a", "1", "Admin", "Admin" },
                    { "304ae92d-f20f-4c8f-8f86-279cbbc18fa5", "2", "User", "User" },
                    { "89fcaf35-956d-45b5-a090-b5f339eac1cc", "3", "HR", "HR" }
                });
        }
    }
}

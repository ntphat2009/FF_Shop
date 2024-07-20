using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class bannerupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Description",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Banners");

            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "Banners",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Banners",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Banners");

            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "Banners",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Banners",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Banners",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

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
    }
}

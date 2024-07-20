using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class resetpasscodedb2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_resetPasswordCodes_Users_UsersId",
                table: "resetPasswordCodes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_resetPasswordCodes",
                table: "resetPasswordCodes");

            migrationBuilder.DropIndex(
                name: "IX_resetPasswordCodes_UsersId",
                table: "resetPasswordCodes");

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

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "resetPasswordCodes");

            migrationBuilder.RenameTable(
                name: "resetPasswordCodes",
                newName: "ResetPasswordCodes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ResetPasswordCodes",
                newName: "Email");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResetPasswordCodes",
                table: "ResetPasswordCodes",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0077c4ac-2d3c-40ec-b70c-6ed2b442fc76", "3", "HR", "HR" },
                    { "664dd10f-748d-4632-9f22-06b13dfc0df1", "2", "User", "User" },
                    { "76511601-0abd-4a22-9b76-bacb40b6f1c4", "1", "Admin", "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ResetPasswordCodes",
                table: "ResetPasswordCodes");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "0077c4ac-2d3c-40ec-b70c-6ed2b442fc76");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "664dd10f-748d-4632-9f22-06b13dfc0df1");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "76511601-0abd-4a22-9b76-bacb40b6f1c4");

            migrationBuilder.RenameTable(
                name: "ResetPasswordCodes",
                newName: "resetPasswordCodes");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "resetPasswordCodes",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "UsersId",
                table: "resetPasswordCodes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_resetPasswordCodes",
                table: "resetPasswordCodes",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_resetPasswordCodes_Users_UsersId",
                table: "resetPasswordCodes",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}

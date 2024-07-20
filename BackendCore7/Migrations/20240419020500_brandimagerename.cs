using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class brandimagerename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Immage",
                table: "Brands",
                newName: "Image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Brands",
                newName: "Immage");
        }
    }
}

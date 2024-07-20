using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class producttag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountProducts_Product_Product_Id",
                table: "DiscountProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Menus_Menus_ParentId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_ParentId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_DiscountProducts_Product_Id",
                table: "DiscountProducts");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "4deda6ec-7044-4e26-aa52-d59de6cf1192");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "504cf611-4912-483c-8946-1e4bdb31dd17");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "ed8a3f17-08d4-4128-baa4-f2f087d119ba");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "Product_Id",
                table: "DiscountProducts");

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductTags",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTags", x => new { x.ProductId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ProductTags_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            //migrationBuilder.InsertData(
            //    table: "Roles",
            //    columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
            //    values: new object[,]
            //    {
            //        { "82b1456f-7e4d-48dd-b581-43237f2be15b", "3", "HR", "HR" },
            //        { "88c17ae0-ac77-494b-aa42-39ca6c3a2170", "2", "User", "User" },
            //        { "a60891bb-0865-4e4c-879b-487841d8cfad", "1", "Admin", "Admin" }
            //    });

            migrationBuilder.CreateIndex(
                name: "IX_ProductTags_TagId",
                table: "ProductTags",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductTags");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "82b1456f-7e4d-48dd-b581-43237f2be15b");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "88c17ae0-ac77-494b-aa42-39ca6c3a2170");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "a60891bb-0865-4e4c-879b-487841d8cfad");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Menus",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Menus",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Product_Id",
                table: "DiscountProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4deda6ec-7044-4e26-aa52-d59de6cf1192", "3", "HR", "HR" },
                    { "504cf611-4912-483c-8946-1e4bdb31dd17", "2", "User", "User" },
                    { "ed8a3f17-08d4-4128-baa4-f2f087d119ba", "1", "Admin", "Admin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Menus_ParentId",
                table: "Menus",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscountProducts_Product_Id",
                table: "DiscountProducts",
                column: "Product_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountProducts_Product_Product_Id",
                table: "DiscountProducts",
                column: "Product_Id",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_Menus_ParentId",
                table: "Menus",
                column: "ParentId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

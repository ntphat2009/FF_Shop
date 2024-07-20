using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendCore7.Migrations
{
    /// <inheritdoc />
    public partial class attributeupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductStores_Product_Product_Id",
                table: "ProductStores");

            migrationBuilder.DropIndex(
                name: "IX_ProductStores_Product_Id",
                table: "ProductStores");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttributes_ProductId",
                table: "ProductAttributes");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "5ca0bd7e-f309-42c0-a1ff-b5ea2a9250c6");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "65fec14e-d7fc-4040-9f0d-3f8facc878ea");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "6ca13dde-ffee-4300-ac40-eb3d51b2fc4e");

            migrationBuilder.RenameColumn(
                name: "Product_Id",
                table: "ProductStores",
                newName: "ProductId");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "031cffdd-5420-4712-8bab-034a6437cb9a", "1", "Admin", "Admin" },
                    { "304ae92d-f20f-4c8f-8f86-279cbbc18fa5", "2", "User", "User" },
                    { "89fcaf35-956d-45b5-a090-b5f339eac1cc", "3", "HR", "HR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductStores_ProductId",
                table: "ProductStores",
                column: "ProductId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttributes_ProductId",
                table: "ProductAttributes",
                column: "ProductId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductStores_Product_ProductId",
                table: "ProductStores",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductStores_Product_ProductId",
                table: "ProductStores");

            migrationBuilder.DropIndex(
                name: "IX_ProductStores_ProductId",
                table: "ProductStores");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttributes_ProductId",
                table: "ProductAttributes");

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

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "ProductStores",
                newName: "Product_Id");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5ca0bd7e-f309-42c0-a1ff-b5ea2a9250c6", "1", "Admin", "Admin" },
                    { "65fec14e-d7fc-4040-9f0d-3f8facc878ea", "3", "HR", "HR" },
                    { "6ca13dde-ffee-4300-ac40-eb3d51b2fc4e", "2", "User", "User" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductStores_Product_Id",
                table: "ProductStores",
                column: "Product_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttributes_ProductId",
                table: "ProductAttributes",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductStores_Product_Product_Id",
                table: "ProductStores",
                column: "Product_Id",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

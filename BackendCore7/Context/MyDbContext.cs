using Microsoft.EntityFrameworkCore;
using BackendCore7.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace BackendCore7.Context
{
    //public class MyDbContext : IdentityDbContext<ApplicationUser>
    public class MyDbContext : IdentityDbContext<ApplicationUser>
    {


        public MyDbContext(DbContextOptions<MyDbContext> options)
           : base(options)
        {
        }
      
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<ResetPasswordCode> ResetPasswordCodes { get; set; }

        public DbSet<DiscountProduct> DiscountProducts { get; set; }
        public DbSet<ProductStore> ProductStores { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<ProductAttributes> ProductAttributes { get; set; }
        private void SeedRolls(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData
                (
                new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" },
                new IdentityRole() { Name = "HR", ConcurrencyStamp = "3", NormalizedName = "HR" }
                );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //:base.OnModelCreating(modelBuilder);
            SeedRolls(modelBuilder);
            // User Login
            //modelBuilder.Entity<IdentityUserLogin<string>>();
            //// User Role
            //modelBuilder.Entity<IdentityUserRole<string>>();
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(x => x.UserId); // Xác định khóa chính cho IdentityUserLogin
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(x => new { x.UserId, x.RoleId }); // Xác định khóa chính cho IdentityUserRole
            modelBuilder.Entity<IdentityUserToken<string>>().HasNoKey();

            // User
            modelBuilder.Entity<ApplicationUser>()
                .HasIndex(p => p.Email).IsUnique();
            modelBuilder.Entity<ApplicationUser>()
                .HasIndex(p => p.PhoneNumber).IsUnique();
            // Brand
            modelBuilder.Entity<Brand>()
                .HasOne(b => b.CreatedBy)
                .WithMany()
                .HasForeignKey(b => b.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Brand>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            // Category
            modelBuilder.Entity<Category>()
              .HasOne(b => b.CreatedBy)
              .WithMany()
              .HasForeignKey(b => b.CreatedById)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Category>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Category>()
               .HasIndex(p => p.Name).IsUnique();
            modelBuilder.Entity<Category>()
             .HasOne(c => c.ParentCategory)
             .WithMany(c => c.SubCategories)
             .HasForeignKey(c => c.ParentId)
             .OnDelete(DeleteBehavior.Restrict);
            // Product
            modelBuilder.Entity<Product>()
               .HasIndex(p => p.Name).IsUnique();
            modelBuilder.Entity<Product>()
               .HasOne(b => b.CreatedBy)
               .WithMany()
               .HasForeignKey(b => b.CreatedById)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Product>()
               .HasOne(p => p.ProductAttributes)
               .WithOne(pa => pa.Product)
               .HasForeignKey<ProductAttributes>(pa => pa.ProductId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>()
               .HasOne(p => p.ProductStores)
               .WithOne(pa => pa.Product)
               .HasForeignKey<ProductStore>(pa => pa.ProductId)
               .OnDelete(DeleteBehavior.Cascade);

            // primarykey  Config primarykey for ProductTag
            modelBuilder.Entity<ProductTag>()
                .HasKey(pt => new { pt.ProductId, pt.TagId });

            //  relationship config 1-N between Product and ProductTag
            modelBuilder.Entity<ProductTag>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.ProductTags)
                .HasForeignKey(pt => pt.ProductId);

            //  relationship config 1-N between Tag and ProductTag
            modelBuilder.Entity<ProductTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.ProductTags)
                .HasForeignKey(pt => pt.TagId);
            // Menu
            modelBuilder.Entity<Menu>()
                .HasOne(b => b.CreatedBy)
                .WithMany()
                .HasForeignKey(b => b.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Menu>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
        
            // Order
            //modelBuilder.Entity<Order>()
            //    .HasOne(b => b.CreatedBy)
            //    .WithMany()
            //    .HasForeignKey(b => b.CreatedById)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Order>()
            //    .HasOne(b => b.UpdatedBy)
            //    .WithMany()
            //    .HasForeignKey(b => b.UpdatedById)
            //    .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            // Contact
            modelBuilder.Entity<Contact>()
               .HasMany(c => c.Replies)
               .WithOne(c => c.ParentContact)
               .HasForeignKey(c => c.ParentContactId)
               .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Contact>()
              .HasOne(b => b.CreatedBy)
              .WithMany()
              .HasForeignKey(b => b.CreatedById)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contact>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Contact>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            // OrderDetail
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany()
                .HasForeignKey(od => od.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Post
            modelBuilder.Entity<Post>()
               .HasOne(b => b.CreatedBy)
               .WithMany()
               .HasForeignKey(b => b.CreatedById)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Post>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Post>()
                .HasOne(p => p.Topic)
                .WithMany(p => p.Posts)
                .HasForeignKey(p => p.Topic_Id)
                .OnDelete(DeleteBehavior.Cascade);
            // Topic
            modelBuilder.Entity<Topic>()
              .HasOne(b => b.CreatedBy)
              .WithMany()
              .HasForeignKey(b => b.CreatedById)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Topic>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            // DiscountProduct
          
            modelBuilder.Entity<DiscountProduct>()
              .HasOne(b => b.CreatedBy)
              .WithMany()
              .HasForeignKey(b => b.CreatedById)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DiscountProduct>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            // Product Store
            //modelBuilder.Entity<ProductStore>()
            //    .HasOne(p => p.Product)
            //    .WithOne(p => p.ProductStores)
            //    .HasForeignKey(<Product>)
            //    .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ProductStore>()
              .HasOne(b => b.CreatedBy)
              .WithMany()
              .HasForeignKey(b => b.CreatedById)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProductStore>()
                .HasOne(b => b.UpdatedBy)
                .WithMany()
                .HasForeignKey(b => b.UpdatedById)
                .OnDelete(DeleteBehavior.Restrict);
            //Product attributes
            //modelBuilder.Entity<ProductAttributes>()
            //    .HasOne(b => b.Product)
            //    .WithMany(p => p.ProductAttributes)
            //    .HasForeignKey(p => p.ProductId)
            //    .OnDelete(DeleteBehavior.Cascade);



        }

    }
}

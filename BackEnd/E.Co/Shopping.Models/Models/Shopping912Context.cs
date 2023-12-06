using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Shopping.Models.Models
{
    public partial class Shopping912Context : DbContext
    {
        public Shopping912Context()
        {
        }
        public Shopping912Context(DbContextOptions<Shopping912Context> options)
            : base(options)
        {
        }
        public virtual DbSet<Admin> Admins { get; set; } = null!;
        public virtual DbSet<CartItem> CartItems { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<News> News { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderItem> OrderItems { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ShoppingSession> ShoppingSessions { get; set; } = null!;
        public virtual DbSet<Task> Tasks { get; set; } = null!;
        public virtual DbSet<Token> Tokens { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<WishList> WishLists { get; set; } = null!;
        public virtual DbSet<Header> Headers { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server =TRIENTM; database =Shopping-912;uid=sa;pwd=trienkaito123;TrustServerCertificate=True;Trusted_Connection=True;");
            }
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("Admin");
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");
            });



            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.ToTable("CartItem");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.CreateAt)
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("create_at");



                entity.Property(e => e.ProductId).HasColumnName("productId");



                entity.Property(e => e.Quantity).HasColumnName("quantity");



                entity.Property(e => e.SessionId).HasColumnName("sessionId");



                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_CartItem_Product");



                entity.HasOne(d => d.Session)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.SessionId)
                    .HasConstraintName("FK_CartItem_ShoppingSession");
            });



            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Header>(entity =>
            {
                entity.ToTable("Header");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.RollName)
                   .HasMaxLength(50)
                   .HasColumnName("rollName");

                entity.Property(e => e.Link)
                  .HasMaxLength(50)
                  .HasColumnName("linkTo");

            });


            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.Comment1)
                    .HasMaxLength(50)
                    .HasColumnName("comment");



                entity.Property(e => e.NewsId).HasColumnName("news_id");



                entity.Property(e => e.Time)
                    .HasColumnType("datetime")
                    .HasColumnName("time");



                entity.Property(e => e.UserId).HasColumnName("user_id");



                entity.HasOne(d => d.News)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.NewsId)
                    .HasConstraintName("FK_Comments_News");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Comments_User");
            });



            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.Content)
                    .HasMaxLength(50)
                    .HasColumnName("content");



                entity.Property(e => e.PostDate)
                    .HasColumnType("datetime")
                    .HasColumnName("postDate");



                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .HasColumnName("title");



                entity.Property(e => e.UserId).HasColumnName("user_id");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_News_User");
            });



            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.CreateAt)
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("createAt");



                entity.Property(e => e.PaymentId).HasColumnName("paymentId");



                entity.Property(e => e.Total)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("total");



                entity.Property(e => e.UserId).HasColumnName("userId");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_OrderDetails_User");
            });



            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.CreateAt)
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("createAt");



                entity.Property(e => e.OrderId).HasColumnName("orderId");



                entity.Property(e => e.ProductId).HasColumnName("productId");



                entity.Property(e => e.Quantity).HasColumnName("quantity");



                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderItems_OrderDetails");



                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_OrderItems_Product");
            });



            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.Descriptions)
                    .HasMaxLength(50)
                    .HasColumnName("descriptions");



                entity.Property(e => e.Hidden).HasColumnName("hidden");



                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image");



                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");



                entity.Property(e => e.Price)
                    .HasColumnType("money")
                    .HasColumnName("price");



                entity.Property(e => e.Quanlity).HasColumnName("quanlity");



                entity.Property(e => e.TaskId).HasColumnName("task_id");



                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_Product_Task");
            });



            modelBuilder.Entity<ShoppingSession>(entity =>
            {
                entity.ToTable("ShoppingSession");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.CreateAt)
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("createAt");



                entity.Property(e => e.Total)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("total");



                entity.Property(e => e.UserId).HasColumnName("userId");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.ShoppingSessions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_ShoppingSession_User");
            });



            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.CategoryId).HasColumnName("category_id");



                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");



                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_Category");
            });



            modelBuilder.Entity<Token>(entity =>
            {
                entity.ToTable("Token");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.ExpiredAt)
                    .HasColumnType("datetime")
                    .HasColumnName("expiredAt");



                entity.Property(e => e.IsRevoked).HasColumnName("isRevoked");



                entity.Property(e => e.IsUsed).HasColumnName("isUsed");



                entity.Property(e => e.IssuedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("issuedAt");



                entity.Property(e => e.JwtId).HasColumnName("jwtId");



                entity.Property(e => e.Token1).HasColumnName("token");



                entity.Property(e => e.UserId).HasColumnName("userId");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tokens)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Token_User");
            });



            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .HasColumnName("address");



                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");



                entity.Property(e => e.EmailConfirm).HasColumnName("emailConfirm");



                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("firstName");



                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("lastName");



                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");



                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .HasColumnName("phone");



                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .HasColumnName("role");
            });



            modelBuilder.Entity<WishList>(entity =>
            {
                entity.ToTable("WishList");



                entity.Property(e => e.Id).HasColumnName("id");



                entity.Property(e => e.ProductId).HasColumnName("product_id");



                entity.Property(e => e.UserId).HasColumnName("user_id");



                entity.HasOne(d => d.Product)
                    .WithMany(p => p.WishLists)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_WishList_Product");



                entity.HasOne(d => d.User)
                    .WithMany(p => p.WishLists)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_WishList_User");
            });



            OnModelCreatingPartial(modelBuilder);
        }



        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

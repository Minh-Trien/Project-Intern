using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Shopping.Controllers;
using BLL.Infrastructure;
using DataAccess.Models;
using BLL.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using DataAccess.ViewModels;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure(builder.Configuration);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
//builder.Services.AddAutoMapper();

builder.Services.AddTransient<ProductService>();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<AuthService>();
builder.Services.AddDbContext<Shopping912Context>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConection"), builder =>
builder.EnableRetryOnFailure()));

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressConsumesConstraintForFormFileParameters = true;
    options.SuppressInferBindingSourcesForParameters = true;
    options.SuppressModelStateInvalidFilter = true;
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");
app.Run();

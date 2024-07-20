
using BackendCore7.Context;
using BackendCore7.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using PayPalCheckoutSdk.Core;
using BackendCore7.Service.Repository;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.Service;
using User.Management.Service.Model;
using User.Management.Service.Service;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc;
using static Org.BouncyCastle.Math.EC.ECCurve;
using BackendCore7.Helpers;
using Microsoft.AspNetCore.Cors.Infrastructure;
//string BackendCore7JS = "_BackendCore7JSDommain";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
//Add Paypal
builder.Services.AddSingleton<PayPalHttpClient>((serviceProvider) =>
{
    var environment = "sandbox";
    return new PayPalHttpClient(environment == "sandbox" ?
        new SandboxEnvironment("AWd7_jN5gltJZzkPvUnHOOvlsH9ffo7ky8cS2YO5gAp7ApZR6nIwVcWSX5AU8FYQ_ALjGilXI9xKtcMM", "EJiHZolc2ZAqw8IoMtm-4RNr9rIVxMsNSBTM9Bd935g3qnYfuVaAxODFZdVCPBBsFnZWWCE4KjzQ44k6") :
        new LiveEnvironment("AWd7_jN5gltJZzkPvUnHOOvlsH9ffo7ky8cS2YO5gAp7ApZR6nIwVcWSX5AU8FYQ_ALjGilXI9xKtcMM", "EJiHZolc2ZAqw8IoMtm-4RNr9rIVxMsNSBTM9Bd935g3qnYfuVaAxODFZdVCPBBsFnZWWCE4KjzQ44k6"));
});
builder.Services.AddIdentity<ApplicationUser,IdentityRole>().AddEntityFrameworkStores<MyDbContext>().AddDefaultTokenProviders();
//Add Config for Required Email
builder.Services.Configure<IdentityOptions>(opts => opts.SignIn.RequireConfirmedEmail = true);
builder.Services.Configure<DataProtectionTokenProviderOptions>(opts => opts.TokenLifespan = TimeSpan.FromHours(5));
//Add Authentication
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddGoogle(googleOptions =>
{
    googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];

}).AddJwtBearer(option =>
{
    option.SaveToken = true;
    option.RequireHttpsMetadata = false;
    option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});
//Add Email Configs
var emailConfig = builder.Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
//Email sender service
builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.AddHostedService<ExpiredCodeCleanupService>();
//builder.Services.AddScoped<CodeService>();
builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("context"));
});
//builder.Services.AddScoped<IPasswordResetTokenProvider<ApplicationUser>, CustomPasswordResetTokenProvider<ApplicationUser>>();

builder.Services.AddScoped<IProductRepository,ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IVnPayRepository, VnPayRepository>();
builder.Services.AddScoped<IBannerRepository, BannerRepository>();
builder.Services.AddScoped<ITopicsRepository, TopicRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IProductAttributesRepository, ProductAttributesRepository>();




//builder.Services.AddScoped<IEmailConfirmationService, EmailConfirmationService>();
builder.Services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
builder.Services.AddScoped<IUrlHelper>(x =>
{
    var actionContext = x.GetRequiredService<IActionContextAccessor>().ActionContext;
    var factory = x.GetRequiredService<IUrlHelperFactory>();
    return factory.GetUrlHelper(actionContext);
});




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
           builder =>
           {
               builder.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002")
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                     
                      .AllowCredentials(); // Nếu bạn đang sử dụng cookie hoặc header khác trong yêu cầu.
           });
});
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    options.JsonSerializerOptions.WriteIndented = true; // Tùy chọn
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "unsafe-none");
    context.Response.Headers.Add("Cross-Origin-Embedder-Policy", "unsafe-none");
    await next();
});

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

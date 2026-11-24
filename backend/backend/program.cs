using Microsoft.EntityFrameworkCore;
using backend.Properties.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Configuration du service CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyMethod()
                                .AllowAnyHeader(); 
                      });
});

// Services existants
builder.Services.AddControllers();
string connectionString = "Data Source=person.db";
builder.Services.AddDbContext<AppDbContext>(op => op.UseSqlite(connectionString));

// 1. AJOUT : Services pour Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. AJOUT : Activation de l'interface Swagger en développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Activation du middleware CORS (obligatoirement AVANT MapControllers)
app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();

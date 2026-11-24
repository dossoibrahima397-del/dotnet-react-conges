using Microsoft.EntityFrameworkCore;


namespace backend.Properties.Models;

public class AppDbContext : DbContext

{
    public AppDbContext(DbContextOptions <AppDbContext> options) : base(options)
    {
        
    }

public DbSet<Person> People {get; set;}

public DbSet<LeaveRequest> LeaveRequests { get; set; } 


}

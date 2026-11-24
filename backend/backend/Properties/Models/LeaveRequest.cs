using System.ComponentModel.DataAnnotations;

namespace backend.Properties.Models;

public class LeaveRequest
{
    public int Id { get; set; }

    [Required]
    [MaxLength(60)]
    public string EmployeeName { get; set; } = string.Empty;

    [Required]
    public string StartDate { get; set; } = string.Empty;

    [Required]
    public string EndDate { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Reason { get; set; } = string.Empty;
}

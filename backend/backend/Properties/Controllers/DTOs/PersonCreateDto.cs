using System.ComponentModel.DataAnnotations;

namespace backend.Properties.DTOs;

public class PersonCreateDto
{
    [Required, MaxLength(30)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(30)]
    public string LastName { get; set; } = string.Empty;

}

using backend.Properties.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Properties.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PeopleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost] // POST /api/people
        public async Task<IActionResult> AddPerson(Person person)
        {
            try
            {
                _context.People.Add(person);
                await _context.SaveChangesAsync();

                // Retourne le code 201 Created + l'URL de la ressource + l'objet créé
                return CreatedAtRoute("Getperson", new { id = person.Id }, person);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet] // GET /api/people 
        public async Task<IActionResult> GetPeople()
        {
            try
            {
                var people = await _context.People.ToListAsync();
                return Ok(people); // 200 OK + liste de toutes les personnes
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id:int}", Name = "Getperson")] // GET /api/people/1
        public async Task<IActionResult> Getperson(int id)
        {
            try
            {
                var person = await _context.People.FindAsync(id);
                if (person is null)
                {
                    return NotFound(); // 404 Not Found
                }

                return Ok(person); // 200 OK + objet person
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:int}")] // PUT /api/people/1
        public async Task<IActionResult> UpdatePerson(int id, [FromBody] Person person)
        {
            try
            {
                if (id != person.Id)
                {
                    return BadRequest("id in Url and body mismatches"); // 400 + message in the body
                }
                if (!await _context.People.AnyAsync(p => p.Id == id))
                {
                    return NotFound(); // 404   
                }

                _context.People.Update(person);
                await _context.SaveChangesAsync();
                return NoContent(); // 204 status code
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id:int}")] // DELETE /api/people/1
        public async Task<IActionResult> DeletePerson(int id)
        {
            try
            {
                var person = await _context.People.FindAsync(id);
                if (person is null)
                {
                    return NotFound(); // 404 not found status code
                }

                _context.People.Remove(person);
                await _context.SaveChangesAsync();
                return NoContent(); // 204 status code
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
//server app : localhost: 3000
//client app (app js) : htpp//localhost/5713 => CORS
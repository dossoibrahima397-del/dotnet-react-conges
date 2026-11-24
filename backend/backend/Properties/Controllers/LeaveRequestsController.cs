using backend.Properties.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Properties.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveRequestsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost] // POST /api/leaverequests
        public async Task<IActionResult> AddLeaveRequest(LeaveRequest leaveRequest)
        {
            try
            {
                _context.LeaveRequests.Add(leaveRequest);
                await _context.SaveChangesAsync();
                return CreatedAtRoute("GetLeaveRequest", new { id = leaveRequest.Id }, leaveRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet] // GET /api/leaverequests
        public async Task<IActionResult> GetLeaveRequests()
        {
            try
            {
                var requests = await _context.LeaveRequests.ToListAsync();
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id:int}", Name = "GetLeaveRequest")]
        public async Task<IActionResult> GetLeaveRequest(int id)
        {
            try
            {
                var request = await _context.LeaveRequests.FindAsync(id);
                if (request is null) return NotFound();
                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:int}")] // PUT /api/leaverequests/1
        public async Task<IActionResult> UpdateLeaveRequest(int id, [FromBody] LeaveRequest leaveRequest)
        {
            try
            {
                if (id != leaveRequest.Id) return BadRequest("id mismatch");
                if (!await _context.LeaveRequests.AnyAsync(l => l.Id == id)) return NotFound();

                _context.LeaveRequests.Update(leaveRequest);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id:int}")] // DELETE /api/leaverequests/1
        public async Task<IActionResult> DeleteLeaveRequest(int id)
        {
            try
            {
                var request = await _context.LeaveRequests.FindAsync(id);
                if (request is null) return NotFound();

                _context.LeaveRequests.Remove(request);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

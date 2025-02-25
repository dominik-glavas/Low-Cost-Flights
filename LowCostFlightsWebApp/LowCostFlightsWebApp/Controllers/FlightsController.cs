using LowCostFlightsWebApp.Models;
using LowCostFlightsWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace LowCostFlightsWebApp.Controllers
{
    [Route("api/flights")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly AmadeusApiService _amadeusApiService;

        public FlightsController(AmadeusApiService amadeusApiService)
        {
            _amadeusApiService = amadeusApiService;
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetFlights([FromBody] FlightSearchDto flightSearch)
        {
            if (flightSearch == null || string.IsNullOrEmpty(flightSearch.Origin) || string.IsNullOrEmpty(flightSearch.Destination) || string.IsNullOrEmpty(flightSearch.DepartureDate))
            {
                return BadRequest("Origin, Destination, and Departure Date are required.");
            }

            var result = await _amadeusApiService.GetFlightOffersAsync(flightSearch);
            return Ok(result);
        }
    }
}

namespace LowCostFlightsWebApp.Models
{
    public class FlightSearchDto
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string DepartureDate { get; set; }
        public string? ReturnDate { get; set; }
        public int Adults { get; set; } = 1;
        public string? TravelClass { get; set; }
        public string? CurrencyCode { get; set; }
    }
}

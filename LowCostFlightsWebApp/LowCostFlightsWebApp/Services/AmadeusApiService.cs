using LowCostFlightsWebApp.Models;

namespace LowCostFlightsWebApp.Services
{
    public class AmadeusApiService
    {
        private readonly HttpClient _httpClient;
        private readonly AmadeusAuthService _authService;

        public AmadeusApiService(HttpClient httpClient, AmadeusAuthService authService)
        {
            _httpClient = httpClient;
            _authService = authService;
        }

        public async Task<string> GetFlightOffersAsync(FlightSearchDto searchDto)
        {
            string token = await _authService.GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            string url = $"https://test.api.amadeus.com/v2/shopping/flight-offers?" +
                         $"originLocationCode={searchDto.Origin}" +
                         $"&destinationLocationCode={searchDto.Destination}" +
                         $"&departureDate={searchDto.DepartureDate}" +
                         $"{(string.IsNullOrEmpty(searchDto.ReturnDate) ? "" : $"&returnDate={searchDto.ReturnDate}")}" +
                         $"&adults={searchDto.Adults}" +
                         $"&travelClass={searchDto.TravelClass}" +
                         $"&currencyCode={searchDto.CurrencyCode}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}

using System.Text.Json;
using System.Text;
using LowCostFlightsWebApp.Models;
using Microsoft.Extensions.Options;

namespace LowCostFlightsWebApp.Services
{
    public class AmadeusAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly AmadeusSettings _settings;
        private string _accessToken;
        private DateTime _tokenExpiration;

        public AmadeusAuthService(HttpClient httpClient, IOptions<AmadeusSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task<string> GetAccessTokenAsync()
        {
            if (!string.IsNullOrEmpty(_accessToken) && _tokenExpiration > DateTime.UtcNow)
            {
                return _accessToken;
            }

            var content = new StringContent($"grant_type=client_credentials&client_id={_settings.ClientId}&client_secret={_settings.ClientSecret}",
                                            Encoding.UTF8, "application/x-www-form-urlencoded");

            var response = await _httpClient.PostAsync(_settings.TokenUrl, content);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            using var jsonDoc = JsonDocument.Parse(responseBody);

            _accessToken = jsonDoc.RootElement.GetProperty("access_token").GetString();
            int expiresIn = jsonDoc.RootElement.GetProperty("expires_in").GetInt32();
            _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn - 60);

            return _accessToken;
        }
    }
}

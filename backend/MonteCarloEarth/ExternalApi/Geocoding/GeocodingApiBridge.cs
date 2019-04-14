using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonteCarloEarth.Common;
using MonteCarloEarth.ExternalApi.Geocoding;
using MonteCarloEarth.ViewModel;
using Newtonsoft.Json;

namespace MonteCarloEarth.ExternalApi
{
    public class GeocodingApiProvider : IGeocodingProvider
    {
        private readonly IConfiguration configuration;
        private readonly HttpClient client;

        public GeocodingApiProvider(IConfiguration configuration)
        {
            this.configuration = configuration;
            client = new HttpClient();
        }

        public async Task<string> ReverseGeocoding(IPoint point)
        {
            string url = BuidRequestUrl(point);

            using (HttpResponseMessage res = await client.GetAsync(url))
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    var model = JsonConvert.DeserializeObject<GeocodingReponseViewModel>(data);
                    if (model.Status.Message == "OK")
                    {
                        //theoretically, client shouldn't ask or location if it already knows that isWater is true
                        return model.Results.Any() ? model.Results[0].Components.Country : "Somewhere on the water";
                    }
                    else
                    {
                        throw new ApiException(model.Status.Message);
                    }
                }
            }

            throw new ApiException("Could not receive data from api.");
        }

        private string BuidRequestUrl(IPoint point)
        {
            string apiKey = configuration.GetSection("ApiKeys")["GeocodingApi"];
            float lat = point.Latitude;
            float lon = point.Longitude;
            string baseUrl = $"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={apiKey}";
            return baseUrl;
        }

        public void Dispose()
        {
            client?.Dispose();
        }
    }
}
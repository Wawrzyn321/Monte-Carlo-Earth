using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MonteCarloEarth.Common;
using MonteCarloEarth.ViewModel;
using Newtonsoft.Json;

namespace MonteCarloEarth.ExternalApi.OnWater
{
    public class OnWaterApiProvider : IOnWaterProvider
    {
        private readonly IConfiguration configuration;
        private readonly HttpClient client;

        public OnWaterApiProvider(IConfiguration configuration)
        {
            this.configuration = configuration;
            client = new HttpClient();
        }

        public async Task<bool> IsOnWaterAsync(IPoint point)
        {
            string url = BuildApiUrl(point);

            using (HttpResponseMessage res = await client.GetAsync(url))
            using (HttpContent content = res.Content)
            {
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    var model = JsonConvert.DeserializeObject<OnWaterApiResponseViewModel>(data);
                    if (string.IsNullOrEmpty(model.Error))
                    {
                        return model.IsWater;
                    }
                    else
                    {
                        throw new ApiException(model.Error);
                    }
                }
            }

            throw new ApiException("Could not receive data from api.");
        }

        private string BuildApiUrl(IPoint point)
        {
            string apiKey = configuration.GetSection("ApiKeys")["OnWaterApi"];
            float lat = point.Latitude;
            float lon = point.Longitude;
            string baseUrl = $"https://api.onwater.io/api/v1/results/{lon},{lat}?access_token={apiKey}";
            return baseUrl;
        }

        public void Dispose()
        {
            client?.Dispose();
        }
    }
}

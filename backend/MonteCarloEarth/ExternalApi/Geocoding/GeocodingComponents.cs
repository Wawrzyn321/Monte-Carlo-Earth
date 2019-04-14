using Newtonsoft.Json;

namespace MonteCarloEarth.ExternalApi.Geocoding
{
    public class GeocodingComponents
    {
        [JsonProperty("country")]
        public string Country { get; set; }
    }
}
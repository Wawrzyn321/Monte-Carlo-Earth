using Newtonsoft.Json;

namespace MonteCarloEarth.ExternalApi.Geocoding
{
    public class GeocodingAnnotation
    {
        [JsonProperty("components")]
        public GeocodingComponents Components { get; set; }
    }
}
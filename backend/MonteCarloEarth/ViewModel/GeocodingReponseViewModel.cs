using System.Collections.Generic;
using MonteCarloEarth.ExternalApi.Geocoding;
using Newtonsoft.Json;

namespace MonteCarloEarth.ViewModel
{
    public class GeocodingReponseViewModel
    {
        [JsonProperty("results")]
        public IList<GeocodingAnnotation> Results { get; set; }
        [JsonProperty("status")]
        public GeocodingStatus Status { get; set; }
    }
}

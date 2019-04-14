using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace MonteCarloEarth.ExternalApi.Geocoding
{
    public class GeocodingStatus
    {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}

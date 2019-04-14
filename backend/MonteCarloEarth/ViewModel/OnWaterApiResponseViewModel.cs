using Newtonsoft.Json;

namespace MonteCarloEarth.ViewModel
{
    public class OnWaterApiResponseViewModel
    {
        [JsonProperty("water")]
        public bool IsWater { get; set; }
        [JsonProperty("error")]
        public string Error { get; set; }
    }
}

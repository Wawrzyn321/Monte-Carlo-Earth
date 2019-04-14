using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.ViewModel;
using System.Threading.Tasks;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.Geocoding;

namespace MonteCarloEarth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeocodingController : ControllerBase
    {
        private readonly IGeocodingProvider geocodingApi;

        public GeocodingController(IGeocodingProvider geocodingApi)
        {
            this.geocodingApi = geocodingApi;
        }

        [HttpGet]
        public async Task<ActionResult> Get(float latitude, float longitude)
        {
            var point = new PointViewModel { Latitude = latitude, Longitude = longitude };
            string location = await geocodingApi.ReverseGeocoding(point);
            return new JsonResult(location);
        }
    }
}

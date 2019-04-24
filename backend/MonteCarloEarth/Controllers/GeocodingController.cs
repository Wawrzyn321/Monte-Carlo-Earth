using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.ViewModel;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.Geocoding;

namespace MonteCarloEarth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeocodingController : ControllerBase
    {
        private readonly IGeocodingProvider geocodingApi;
        private readonly ILogger<GeocodingController> logger;

        public GeocodingController(IGeocodingProvider geocodingApi, ILogger<GeocodingController> logger)
        {
            this.geocodingApi = geocodingApi;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> Get(float latitude, float longitude)
        {
            var point = new PointViewModel { Latitude = latitude, Longitude = longitude };

            try
            {
                string location = await geocodingApi.ReverseGeocoding(point);
                return new JsonResult(location);
            }
            catch (ApiException e)
            {
                logger.LogWarning(e.Message);
                //it seems that we reached our 15/minute api calls limit
                return StatusCode(422, e.Message); //422 - Unprocessable failure
            }
        }
    }
}

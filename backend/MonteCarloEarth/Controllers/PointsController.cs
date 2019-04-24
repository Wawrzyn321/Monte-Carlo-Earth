using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.Model;
using MonteCarloEarth.ViewModel;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.OnWater;
using MonteCarloEarth.Repository;

namespace MonteCarloEarth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsController : ControllerBase
    {
        private readonly IOnWaterProvider onWaterApi;
        private readonly IPointRepository repository;
        private readonly ILogger<PointsController> logger;

        public PointsController(IOnWaterProvider onWaterApi, IPointRepository repository, ILogger<PointsController> logger)
        {
            this.onWaterApi = onWaterApi;
            this.repository = repository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<SummaryViewModel>> Get()
        {
            long waterCount = await repository.Count(point => point.IsWater);
            long allCount = await repository.Count(point => true);
            return new JsonResult(new SummaryViewModel
            {
                WaterCount = waterCount,
                AllCount = allCount
            });
        }

        [HttpPost]
        public async Task<ActionResult> Post()
        {
            var p = Point.CreatePoint();

            try
            {
                p.IsWater = await onWaterApi.IsOnWaterAsync(p);
            }
            catch (ApiException e)
            {
                logger.LogWarning(e.Message);
                //it seems that we reached our 15/minute api calls limit
                return StatusCode(422, e.Message); //422 - Unprocessable failure
            }

            await repository.AddAsync(p);

            return new JsonResult(new PointViewModel
            {
                IsWater = p.IsWater,
                Longitude = p.Longitude,
                Latitude = p.Latitude
            });
        }
    }
}

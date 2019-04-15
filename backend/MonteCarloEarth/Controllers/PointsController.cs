using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.Model;
using MonteCarloEarth.ViewModel;
using System.Threading.Tasks;
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

        public PointsController(IOnWaterProvider onWaterApi, IPointRepository repository)
        {
            this.onWaterApi = onWaterApi;
            this.repository = repository;
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
            p.IsWater = await onWaterApi.IsOnWaterAsync(p);

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

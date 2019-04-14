using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonteCarloEarth.Model;
using MonteCarloEarth.Repository;

namespace MonteCarloEarth.Mock
{
    public class MockRepository : IPointRepository
    {
        private readonly List<Point> points;

        public MockRepository()
        {
            points = CreateSamplePoints();
        }

        public async Task AddAsync(Point point)
        {
            points.Add(point);
            await Task.CompletedTask;
        }

        public async Task<long> Count(Func<Point, bool> predicate)
        {
            return await Task.FromResult(points.Count(predicate));
        }

        private List<Point> CreateSamplePoints()
        {
            var samplePoints = new List<Point>
            {
                Point.CreatePoint(),
                Point.CreatePoint(),
                Point.CreatePoint(),
                Point.CreatePoint()
            };
            //let's have 75% of points "on water"
            samplePoints[0].IsWater = true;
            samplePoints[1].IsWater = true;
            samplePoints[2].IsWater = true;
            return samplePoints;
        }

    }
}

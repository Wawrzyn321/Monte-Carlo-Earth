using System;
using System.Threading.Tasks;
using MonteCarloEarth.Common;
using MonteCarloEarth.ExternalApi.OnWater;

namespace MonteCarloEarth.Mock
{
    //class used in case configuration has not been provided
    public class OnWaterMockProvider : IOnWaterProvider
    {
        private readonly Random r = new Random();

        public Task<bool> IsOnWaterAsync(IPoint point)
        {
            const double propability = 1 - 0.708;
            bool isOnWater = r.NextDouble() > propability;
            return Task.FromResult(isOnWater);
        }

        public void Dispose()
        {

        }

    }
}

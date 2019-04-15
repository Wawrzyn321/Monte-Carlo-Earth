using System;
using System.Threading.Tasks;
using MonteCarloEarth.Common;

namespace MonteCarloEarth.ExternalApi.OnWater
{
    public interface IOnWaterProvider : IDisposable
    {
        Task<bool> IsOnWaterAsync(IPoint point);
    }
}
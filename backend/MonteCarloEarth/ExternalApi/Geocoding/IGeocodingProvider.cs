using System;
using System.Threading.Tasks;
using MonteCarloEarth.Common;

namespace MonteCarloEarth.ExternalApi.Geocoding
{
    public interface IGeocodingProvider : IDisposable
    {
        Task<string> ReverseGeocoding(IPoint point);
    }
}
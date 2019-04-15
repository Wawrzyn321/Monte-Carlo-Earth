using System;
using System.Threading.Tasks;
using MonteCarloEarth.Common;
using MonteCarloEarth.ExternalApi.Geocoding;

namespace MonteCarloEarth.Mock
{
    //class used in case configuration has not been provided
    public class GeocodingMockApi : IGeocodingProvider
    {
        private readonly string[] sampleLocations = new[]
        {
            "Berlin",
            "Ottawa",
            "Moscow",
            "Sydney"
        };

        private readonly Random r = new Random();

        public Task<string> ReverseGeocoding(IPoint point)
        {
            string location = sampleLocations[r.Next(0, sampleLocations.Length)];
            return Task.FromResult(location);
        }

        public void Dispose()
        {
            
        }

    }
}

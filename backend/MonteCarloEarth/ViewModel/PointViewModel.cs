using MonteCarloEarth.Common;

namespace MonteCarloEarth.ViewModel
{
    public class PointViewModel : IPoint
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public bool IsWater { get; set; }
    }
}

using System;
using MonteCarloEarth.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonteCarloEarth.Repository
{
    public interface IPointRepository
    {
        Task AddAsync(Point point);

        Task<long> Count(Func<Point, bool> predicate);

    }
}

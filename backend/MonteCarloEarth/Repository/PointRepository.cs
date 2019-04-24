using MongoDB.Driver;
using MonteCarloEarth.Model;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MonteCarloEarth.Repository
{
    public class PointRepository : IPointRepository
    {
        private readonly IMongoCollection<Point> points;

        public PointRepository(MongoClient client)
        {
            points = client.GetDatabase("monte-carlo-db").GetCollection<Point>("points");
        }

        public async Task AddAsync(Point point)
        {
            await points.InsertOneAsync(point);
        }

        public async Task<long> Count(Func<Point, bool> predicate)
        {
            //points.CountDocumentsAsync() won't work
            //http://blog.i3arnon.com/2015/12/16/async-linq-to-objects-over-mongodb/
            var queryable = points.AsQueryable();
            var asyncEnumerable = queryable.ToAsyncEnumerable();
            int count = await asyncEnumerable.Count(predicate);
            return count;
        }
    }
}

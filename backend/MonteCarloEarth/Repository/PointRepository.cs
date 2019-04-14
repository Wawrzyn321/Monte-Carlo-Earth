using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MonteCarloEarth.Model;

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
            return await points.CountDocumentsAsync(point => predicate(point));
        }
    }
}

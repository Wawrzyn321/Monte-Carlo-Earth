using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MonteCarloEarth.Common;

namespace MonteCarloEarth.Model
{
    public class Point : IPoint
    {
        private Point()
        {

        }

        [BsonId]
        [BindNever]
        [BsonElement("id")]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; }

        [BsonElement("latitude")]
        public float Latitude { get; set; }

        [BsonElement("longitude")]
        public float Longitude { get; set; }

        [BsonElement("IsWater")]
        public bool IsWater { get; set; }

        public static Point CreatePoint()
        {
            Random r = new Random();
            float latitude = MapToFloat(r.NextDouble(), -90, 90);
            float longitude = MapToFloat(r.NextDouble(), -180, 180);
            return new Point
            {
                Latitude = latitude,
                Longitude = longitude,
                Id = Guid.NewGuid().ToString()
            };
        }

        //maps double in range (0, 1) to float in range (min, max)
        private static float MapToFloat(double value, double min, double max)
        {
            double range = max - min;
            return (float)(value * range + min);
        }
    }
}

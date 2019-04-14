using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.Common;
using MonteCarloEarth.Controllers;
using MonteCarloEarth.ExternalApi.Geocoding;
using Moq;
using Xunit;

namespace MonteCarloEarth.Tests.Controllers
{
    public class GeocodingControllerTests
    {
        [Fact]
        public async Task GET_ReturnsValidResponse()
        {
            var providerMock = new Mock<IGeocodingProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.ReverseGeocoding(It.IsAny<IPoint>()))
                .ReturnsAsync("location");
            var controller = new GeocodingController(providerMock.Object);

            var result = await controller.Get(0, 0);

            Assert.IsType<JsonResult>(result);
            var jsonResult = (JsonResult) result;
            Assert.Equal("location", jsonResult.Value);
        }
    }
}
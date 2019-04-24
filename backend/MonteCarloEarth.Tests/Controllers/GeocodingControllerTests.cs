using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonteCarloEarth.Common;
using MonteCarloEarth.Controllers;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.Geocoding;
using Moq;
using Xunit;

namespace MonteCarloEarth.Tests.Controllers
{
    public class GeocodingControllerTests
    {
        [Fact]
        public async Task GET_ReturnsValidResponse_OnValidBridgeResponse()
        {
            var providerMock = new Mock<IGeocodingProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.ReverseGeocoding(It.IsAny<IPoint>()))
                .ReturnsAsync("location");
            var loggerStub = new Mock<ILogger<GeocodingController>>(MockBehavior.Loose);
            var controller = new GeocodingController(providerMock.Object, loggerStub.Object);

            var result = await controller.Get(0, 0);

            Assert.IsType<JsonResult>(result);
            var jsonResult = (JsonResult) result;
            Assert.Equal("location", jsonResult.Value);
        }

        [Fact]
        public async Task GET_Returns422_OnApiProviderError()
        {
            var providerMock = new Mock<IGeocodingProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.ReverseGeocoding(It.IsAny<IPoint>()))
                .Throws<ApiException>();
            var loggerStub = new Mock<ILogger<GeocodingController>>(MockBehavior.Loose);
            var controller = new GeocodingController(providerMock.Object, loggerStub.Object);

            var result = await controller.Get(0, 0);

            Assert.IsType<ObjectResult>(result);
            var jsonResult = (ObjectResult)result;
            Assert.Equal(422, jsonResult.StatusCode);
        }
    }
}
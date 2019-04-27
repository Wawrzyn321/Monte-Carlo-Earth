using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonteCarloEarth.Common;
using MonteCarloEarth.Controllers;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.Geocoding;
using MonteCarloEarth.ViewModel;
using Moq;
using Xunit;

namespace MonteCarloEarth.Tests.Controllers
{
    public class GeocodingControllerTests
    {
        [Fact]
        public async Task GET_ReturnsJsonResult_OnValidBridgeResponse()
        {
            var providerMock = new Mock<IGeocodingProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.ReverseGeocoding(It.IsAny<IPoint>()))
                .ReturnsAsync("location");
            var loggerStub = new Mock<ILogger<GeocodingController>>(MockBehavior.Loose);
            var controller = new GeocodingController(providerMock.Object, loggerStub.Object);

            var result = await controller.Get(0, 0);

            Assert.IsType<JsonResult>(result);
        }

        [Fact]
        public async Task GET_ReturnsValidLocationViewModel_OnValidBridgeResponse()
        {
            var providerMock = new Mock<IGeocodingProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.ReverseGeocoding(It.IsAny<IPoint>()))
                .ReturnsAsync("location");
            var loggerStub = new Mock<ILogger<GeocodingController>>(MockBehavior.Loose);
            var controller = new GeocodingController(providerMock.Object, loggerStub.Object);

            var result = await controller.Get(0, 0);

            JsonResult jsonResult = (JsonResult)result;
            Assert.IsType<LocationViewModel>(jsonResult.Value);
            LocationViewModel viewModel = (LocationViewModel)jsonResult.Value;
            Assert.Equal("location", viewModel.Location);
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
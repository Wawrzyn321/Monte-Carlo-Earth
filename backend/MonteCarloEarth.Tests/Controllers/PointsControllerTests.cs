using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonteCarloEarth.Common;
using MonteCarloEarth.Controllers;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.OnWater;
using MonteCarloEarth.Model;
using MonteCarloEarth.Repository;
using MonteCarloEarth.ViewModel;
using Moq;
using Xunit;

namespace MonteCarloEarth.Tests.Controllers
{
    public class PointsControllerTests
    {
        [Fact]
        public async Task POST_ReturnsValidResult()
        {
            var providerMock = new Mock<IOnWaterProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.IsOnWaterAsync(It.IsAny<IPoint>()))
                .ReturnsAsync(true);
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Loose);
            var loggerStub = new Mock<ILogger<PointsController>>(MockBehavior.Loose);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object, loggerStub.Object);

            ActionResult actionResult = await controller.Post();

            Assert.IsType<JsonResult>(actionResult);
            var jsonResult = (JsonResult)actionResult;
            Assert.NotNull(jsonResult.Value);
            var point = (PointViewModel)jsonResult.Value;
            Assert.True(point.IsWater);
        }

        [Fact]
        public async Task GET_ReturnsValidResponse()
        {
            var providerMock = new Mock<IOnWaterProvider>(MockBehavior.Loose);
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Loose);
            var loggerStub = new Mock<ILogger<PointsController>>(MockBehavior.Loose);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object, loggerStub.Object);

            var actionResult = await controller.Get();

            Assert.IsType<JsonResult>(actionResult.Result);
            var jsonResult = (JsonResult)actionResult.Result;
            Assert.IsType<SummaryViewModel>(jsonResult.Value);
        }

        [Fact]
        public async Task GET_ReturnsValidData()
        {
            var providerMock = new Mock<IOnWaterProvider>(MockBehavior.Strict);
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Strict);
            var loggerStub = new Mock<ILogger<PointsController>>(MockBehavior.Loose);
            repositoryMock.Setup(repository => repository.Count(It.IsAny<Func<Point, bool>>()))
                .ReturnsAsync(5);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object, loggerStub.Object);

            var actionResult = await controller.Get();

            var jsonResult = (JsonResult)actionResult.Result;
            var summary = (SummaryViewModel)jsonResult.Value;
            Assert.Equal(5, summary.WaterCount);
            Assert.Equal(5, summary.AllCount);
        }

        [Fact]
        public async Task POST_AddsPointToRepository()
        {
            var providerMock = new Mock<IOnWaterProvider>(MockBehavior.Strict);
            var loggerStub = new Mock<ILogger<PointsController>>(MockBehavior.Loose);
            providerMock.Setup(provider => provider.IsOnWaterAsync(It.IsAny<IPoint>()))
                .ReturnsAsync(true);
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Loose);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object, loggerStub.Object);

            await controller.Post();

            repositoryMock.Verify(mock => mock.AddAsync(It.IsAny<Point>()), Times.Once());
        }

        [Fact]
        public async Task POST_Returns422_OnApiProviderError()
        {
            var providerMock = new Mock<IOnWaterProvider>(MockBehavior.Strict);
            providerMock.Setup(provider => provider.IsOnWaterAsync(It.IsAny<IPoint>()))
                .Throws<ApiException>();
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Strict);
            var loggerStub = new Mock<ILogger<PointsController>>(MockBehavior.Loose);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object, loggerStub.Object);

            var result = await controller.Post();

            Assert.IsType<ObjectResult>(result);
            var jsonResult = (ObjectResult)result;
            Assert.Equal(422, jsonResult.StatusCode);
        }
    }
}

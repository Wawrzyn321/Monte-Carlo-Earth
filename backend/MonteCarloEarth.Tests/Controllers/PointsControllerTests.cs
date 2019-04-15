using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonteCarloEarth.Common;
using MonteCarloEarth.Controllers;
using MonteCarloEarth.ExternalApi;
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
            var controller = new PointsController(providerMock.Object, repositoryMock.Object);

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
            var controller = new PointsController(providerMock.Object, repositoryMock.Object);

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
            repositoryMock.Setup(repository => repository.Count(It.IsAny<Func<Point, bool>>()))
                .ReturnsAsync(5);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object);

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
            providerMock.Setup(provider => provider.IsOnWaterAsync(It.IsAny<IPoint>()))
                .ReturnsAsync(true);
            var repositoryMock = new Mock<IPointRepository>(MockBehavior.Loose);
            var controller = new PointsController(providerMock.Object, repositoryMock.Object);

            await controller.Post();

            repositoryMock.Verify(mock => mock.AddAsync(It.IsAny<Point>()), Times.Once());
        }
    }
}

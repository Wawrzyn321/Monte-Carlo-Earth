# Monte-Carlo-Earth

[Website](https://wawrzyn321.github.io/Monte-Carlo-Earth/)

So... what is Monte Carlo method?
Suppose we have two rectangles on a surface:

![shapes](readme/shapes.png?raw=true "Rectangles")

How to calculate ratio of red rectangle to the white rectangle?

We could get the ratio by measuring the sides of the figures, calculating their areas and dividing them, right? But it's boring.
Instead, we could throw reasonably infinite number of points on that surface and divide the number of point that have fallen on red rectangle by total number of points - and bang, we have the estimated ratio.

Let's do this again, but in 3D, and calculate the percentage of oceans in the Earth surface. [Wikipedia says it's 70.8%](https://en.wikipedia.org/wiki/Earth#Surface) - let's check it empirically!

We can use [On Water API](https://onwater.io/) to determine if point (defined by a coordinates, namely by latitude and longitude) is... on water. With this knowledge, we can toss randomly generated points and calculate the ratio!

Technologies used:
* Backend:
  * ASP.NET Web API 2.2
  * Xunit with Moq
* Frontend:
  * Angular 6
  * Bootstrap 4
* External APIs
  * [On Water API](https://onwater.io/)
  * [OpenCage Geocoding API](https://opencagedata.com/api)

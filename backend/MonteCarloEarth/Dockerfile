FROM mcr.microsoft.com/dotnet/core/sdk:2.2

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

CMD ["dotnet", "/app/out/MonteCarloEarth.dll", "--urls", "http://localhost:5050"]
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Fennorad/Fennorad.csproj", "Fennorad/"]
RUN dotnet restore "Fennorad/Fennorad.csproj"
COPY . .
WORKDIR "/src/Fennorad"
RUN dotnet build "Fennorad.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Fennorad.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fennorad.dll"]
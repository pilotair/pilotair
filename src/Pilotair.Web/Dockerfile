#https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY src/Pilotair.Core/Pilotair.Core.csproj ./Pilotair.Core/Pilotair.Core.csproj
COPY src/Pilotair.Web/Pilotair.Web.csproj ./Pilotair.Web/Pilotair.Web.csproj
RUN dotnet restore Pilotair.Web

# copy everything else and build app
COPY src .
WORKDIR /source/Pilotair.Web
RUN dotnet publish -c release -o /app --no-restore

# # final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
VOLUME [ "/data" ]
EXPOSE 80
ENV ASPNETCORE_HTTP_PORTS=80
ENV Pilotair__DataPath=/data
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "Pilotair.Web.dll"]
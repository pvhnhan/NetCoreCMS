FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/CMS.Application/CMS.Application.csproj", "src/CMS.Application/"]
COPY ["src/CMS.Core/CMS.Core.csproj", "src/CMS.Core/"]
COPY ["src/CMS.Infrastructure/CMS.Infrastructure.csproj", "src/CMS.Infrastructure/"]
COPY ["src/CMS.Common/CMS.Common.csproj", "src/CMS.Common/"]
RUN dotnet restore "src/CMS.Application/CMS.Application.csproj"
COPY . .
WORKDIR "/src/src/CMS.Application"
RUN dotnet build "CMS.Application.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CMS.Application.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CMS.Application.dll"] 
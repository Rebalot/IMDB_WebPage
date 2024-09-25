import { mezclarItems, mapData, fetchData } from "../helpers/helpers";
export async function fetchByPlatformData(options) {
    const urlBase = "https://api.themoviedb.org/3/discover";

    const watchProviderIDs = {
      'Netflix': 8,
      "Disney Plus": 337,
      "Prime Video": 119,
      'Max': 1899,
      "Apple TV": 350,
      "Claro Video": 167,
      'Crunchyroll': 283,
    };
    const allDataArray = await Promise.all(
        Object.entries(watchProviderIDs).map(async ([platformName, id]) => {
          //watch_region (MX), with_watch_providers (337 Disney +, 119 Amazon Prime Video, 167 ClaroVideo, 2 Apple Tv, 8 Netflix, 283 Crunchyroll, 1899 Max )
            const allData = await fetchData({
              urlMovie: `${urlBase}/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=MX&with_watch_providers=${id}`,
              urlTV: `${urlBase}/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=MX&with_watch_providers=${id}`},
            options);
            return {
            watch_provider: platformName,
            watch_provider_id: id,
            ...allData,
            };
        })
    );
    
    return transformarDataCarousel(allDataArray);

    function transformarDataCarousel(arrayAFiltrar) {

      const dataTransformada = arrayAFiltrar.map((plataforma) => {
        // console.log('plataforma: ',plataforma)

        const listaPlataformaMovies = mapData(
          plataforma.movieData.results
        );
        const listaPlataformaTv = mapData(plataforma.tvData.results);
        
        const allItemsObject = {
          movie_items: [...listaPlataformaMovies],
          tvshow_items: [...listaPlataformaTv]
        };

        const combinedTrailersData = mezclarItems(allItemsObject);
        // console.log('combined trailers data: ', combinedTrailersData);
        return {
            tabTitle: plataforma.watch_provider,
            watch_provider_id: plataforma.watch_provider_id,
            carouselItems: [...combinedTrailersData],
          }
      });
      return dataTransformada;
    }
  }
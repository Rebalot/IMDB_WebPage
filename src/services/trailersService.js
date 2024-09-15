import { mezclarItems } from "../helpers/helpers";
export async function fetchTrailersData(options) {
    const urlMovieBase = "https://api.themoviedb.org/3/discover/movie";
    const urlTVBase = "https://api.themoviedb.org/3/discover/tv";
    
    const allData = await listaProximasData();
    if (!allData) return null;

      const listaConTrailerMovies = await obtenerListaConTrailer(
        "movie",
        allData.movieData.results
      );
      const listaConTrailerTv = await obtenerListaConTrailer(
        "tv",
        allData.tvData.results
      );
  
      if (listaConTrailerMovies && listaConTrailerTv) {
        const dataParaCarouselMovies = transformarDataCarousel(listaConTrailerMovies);
        const dataParaCarouselTv = transformarDataCarousel(listaConTrailerTv);
  
         return mezclarItems({ movie_trailer: dataParaCarouselMovies, tvshow_trailer: dataParaCarouselTv }, 4);
      }return null;

  async function listaProximasData() {
    //primary_release_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01)
    const urlMovie = `${urlMovieBase}?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-08-20&sort_by=popularity.desc`;

    //first_air_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01), with_origin_country (US, para evitar que hayan muchos resultados de origen cn, kr, jp que no suelen ser de gusto general)
    const urlTV = `${urlTVBase}?first_air_date.gte=2024-08-20&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US`;

    try {
      const [movieResponse, tvResponse] = await Promise.all([
        fetch(urlMovie, options),
        fetch(urlTV, options),
      ]);

      const movieData = await movieResponse.json();
      const tvData = await tvResponse.json();
      return { movieData, tvData };
    } catch (error) {
      console.error("Error al obtener data", error);
    }
  }

  async function obtenerListaConTrailer(tipo, arrayAIterar) {
    if (arrayAIterar.length === 0) return;
    // Iterar sobre cada película para obtener todos los videos disponibles y posteriormente obtener unicamente el que sea el trailer oficial
    const listaVideosPromises = arrayAIterar.map(async (item) => {
      //item es cada una de las peliculas o tvshows próximos, con el fin de obtener el id y posteriormente buscar sus videos disponibles
      const videosUrl = `https://api.themoviedb.org/3/${tipo}/${item.id}/videos`;

      const response = await fetch(videosUrl, options);
      if (!response.ok) {
        throw new Error(`Error al obtener videos de ${item.id}`);
      }
      const videosData = await response.json();

      // Buscar el trailer oficial dentro de la propiedad results, donde se encuentran los videos disponibles de la pelicula/tvshow.
      const officialTrailer = videosData.results.find(
        (video) => video.type === "Trailer" && video.name === "Official Trailer"
      );

      //Mantiene las propiedades originales y agrega la propiedad official_trailer, en caso de no contar con uno, el value será null.
      return {
        ...item,
        official_trailer: officialTrailer ? officialTrailer : null,
      };
    });

    const updatedElement = await Promise.all(listaVideosPromises);

    return updatedElement;
  }
  function transformarDataCarousel(arrayAFiltrar) {
    //Para descartar las películas o shows que no cuentan con official trailer
    const listaConTrailerDisponible = arrayAFiltrar.filter(
      (item) => item.official_trailer !== null
    );
    // console.log('listaConTrailerDisponible', listaConTrailerDisponible)
    const dataTransformada = listaConTrailerDisponible.map((item) => {
      return {
        title: item.hasOwnProperty("title") ? item.title : item.name,
        image: `https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/${item.backdrop_path}`,
        trailerUrl: `https://www.youtube.com/watch?v=${item.official_trailer.key}`,
        id: item.id,
        tipo: item.hasOwnProperty("original_title") ? "movie" : "tv",
      };
    });
    return dataTransformada;
  }
}

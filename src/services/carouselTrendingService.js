import { fetchData, mapData } from "../helpers/helpers";

export async function fetchTrendingData(options) {
    const urlBase =
        "https://api.themoviedb.org/3/trending";

        
    const allData = await fetchData({
      urlMovie: `${urlBase}/movie/day?language=en-US`,
      urlTV: `${urlBase}/tv/day?language=en-US`},
      options);
    if (!allData) return null;

      const listaTrendingMovies = mapData(allData.movieData.results);
      const listaTrendingTv = mapData(allData.tvData.results);

      // console.log('listaTrendingMovies: ', listaTrendingMovies)
      // console.log('listaTrendingTv: ', listaTrendingTv)
      return [
        {
          tabTitle: "Movies",
          carouselItems: [...listaTrendingMovies],
        },
        {
          tabTitle: "TV shows",
          carouselItems: [...listaTrendingTv],
        },
      ];

    async function trendingData() {
      try {
        const [movieResponse, tvResponse] = await Promise.all([
          fetch(urlTrendingMovie, options),
          fetch(urlTrendingTv, options),
        ]);

        const movieData = await movieResponse.json();
        const tvData = await tvResponse.json();

        return { movieData, tvData };
      } catch (error) {
        console.error("Error al obtener data", error);
      }
    }
  }
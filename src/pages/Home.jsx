import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from "../assets/styles/Home.module.css";
import Carousel from "../components/CarouselTrailers";
import PosterGallery from "../components/PosterGallery";
import { Spinner } from "react-bootstrap";

const Home = ({ onLoadComplete }) => {
  const urlMovieBase = "https://api.themoviedb.org/3/discover/movie";
  const urlTVBase = "https://api.themoviedb.org/3/discover/tv";

  const [loading, setLoading] = useState(true);
  const [trailersData, setTrailersData] = useState({});
  const [trendingData, setTrendingData] = useState({});
  const [byPlatformData, setByPlatformData] = useState({});
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };
  
  ///////////////////////////
  useEffect(() => {
    loadAllData();
    async function startupTrailersData() {
      const allData = await listaProximasData();

      if (allData) {
        const listaConTrailerMovies = await obtenerListaConTrailer(
          "movie",
          allData.movieData.results
        );
        const listaConTrailerTv = await obtenerListaConTrailer(
          "tv",
          allData.tvData.results
        );

        if (listaConTrailerMovies && listaConTrailerTv) {
          let trailersData = {};
          const dataParaCarouselMovies = transformarDataCarousel(
            listaConTrailerMovies
          );
          const dataParaCarouselTv = transformarDataCarousel(listaConTrailerTv);

          trailersData.movie_trailer = dataParaCarouselMovies;
          trailersData.tvshow_trailer = dataParaCarouselTv;

          if (
            trailersData.hasOwnProperty("movie_trailer") &&
            trailersData.hasOwnProperty("tvshow_trailer")
          ) {
            // console.log("trailers data: ", trailersData);

            function mezclarMoviesTvs(object) {
              const extraerItems = Object.entries(object).map(
                ([tipo, items]) => {
                  return items.slice(0, 4);
                }
              );

              const maxLength = Math.max(
                ...extraerItems.map((items) => items.length)
              );

              const combinedTrailers = [];
              for (let i = 0; i < maxLength; i++) {
                extraerItems.forEach((items) => {
                  if (i < items.length) {
                    combinedTrailers.push(items[i]);
                  }
                });
              }

              return combinedTrailers;
            }

            const combinedTrailers = mezclarMoviesTvs(trailersData);
            // console.log('CarouselDataTrailers: ', combinedTrailers)
            setTrailersData(combinedTrailers);
          }
        }
      }
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
            (video) =>
              video.type === "Trailer" && video.name === "Official Trailer"
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
            title: item.hasOwnProperty("original_title")
              ? item.original_title
              : item.name,
            image: `https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/${item.backdrop_path}`,
            trailerUrl: `https://www.youtube.com/watch?v=${item.official_trailer.key}`,
            id: item.id,
            tipo: item.hasOwnProperty("original_title") ? "movie" : "tv",
          };
        });
        return dataTransformada;
      }
    }

    async function startupTrendingData() {
      const allData = await trendingData();
      if (allData) {
        const mapTrendingData = (data) => {
          return data.map((item) => ({
            title: item.hasOwnProperty("original_title")
              ? item.original_title
              : item.name,
            rating: item.vote_average,
            imgUrl: `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
            releaseDate: item.hasOwnProperty("release_date")
              ? item.release_date
              : item.first_air_date,
            id: item.id,
            tipo: item.hasOwnProperty("original_title") ? "movie" : "tv",
          }));
        };

        const listaTrendingMovies = mapTrendingData(allData.movieData.results);
        const listaTrendingTv = mapTrendingData(allData.tvData.results);

        // console.log('listaTrendingMovies: ', listaTrendingMovies)
        // console.log('listaTrendingTv: ', listaTrendingTv)
        const dataPosterGallery = [
          {
            tabTitle: "Movies",
            carouselItems: [...listaTrendingMovies],
          },
          {
            tabTitle: "TV shows",
            carouselItems: [...listaTrendingTv],
          },
        ];

        // console.log("CarouselDataTrending: ", dataPosterGallery);
        setTrendingData(dataPosterGallery);
      }
      async function trendingData() {
        const urlTrendingMovie =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        const urlTrendingTv =
          "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
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
    async function startupByPlatformData() {
      const watchProviderIDs = {
        "Disney Plus": 337,
        "Amazon Prime Video": 119,
        "Claro Video": 167,
        "Apple TV": 2,
        'Netflix': 8,
        'Crunchyroll': 283,
        'Max': 1899,
      };

      try {
        const allDataArray = await Promise.all(
          Object.entries(watchProviderIDs).map(async ([platformName, id]) => {
            const allData = await popularByPlatformData(id);
            return {
              watch_provider: platformName,
              watch_provider_id: id,
              ...allData,
            };
          })
        );
        
        const allPlatformsData = transformarDataCarousel(allDataArray);
        // console.log("Data transformada plataform:", allPlatformsData);
        setByPlatformData(allPlatformsData);

      } catch (error) {
        console.error("Error al obtener datos por plataforma", error);
      }

      async function popularByPlatformData(watchProviderID) {
        //watch_region (MX), with_watch_providers (337 Disney +, 119 Amazon Prime Video, 167 ClaroVideo, 2 Apple Tv, 8 Netflix, 283 Crunchyroll, 1899 Max )
        const urlMovie = `${urlMovieBase}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=MX&with_watch_providers=${watchProviderID}`;
        const urlTV = `${urlTVBase}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=MX&with_watch_providers=${watchProviderID}`;

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
      function transformarDataCarousel(arrayAFiltrar) {

        const dataTransformada = arrayAFiltrar.map((plataforma) => {

          const mapTrendingData = (data) => {
            return data.map((item) => ({
              title: item.hasOwnProperty("original_title")
                ? item.original_title
                : item.name,
              rating: item.vote_average,
              imgUrl: `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
              releaseDate: item.hasOwnProperty("release_date")
                ? item.release_date
                : item.first_air_date,
              id: item.id,
              tipo: item.hasOwnProperty("original_title") ? "movie" : "tv",
            }));
          };

          const listaPlataformaMovies = mapTrendingData(
            plataforma.movieData.results
          );
          const listaPlataformaTv = mapTrendingData(plataforma.tvData.results);
          
          const allItemsObject = {
            movie_items: [...listaPlataformaMovies],
            tvshow_items: [...listaPlataformaTv]
          };

          function mezclarMoviesTvs(object) {
            const extraerItems = Object.entries(object).map(
              ([tipo, items]) => {
                //de cada tipo dentro del objeto, extrae los primeros 4 items
                // return items.slice(0, 4);
                return items;
              }
            );

            const maxLength = Math.max(
              ...extraerItems.map((items) => items.length)
            );

            const combinedTrailers = [];
            for (let i = 0; i < maxLength; i++) {
              extraerItems.forEach((items) => {
                if (i < items.length) {
                  combinedTrailers.push(items[i]);
                }
              });
            }

            return combinedTrailers;
          }
          const combinedTrailersData = mezclarMoviesTvs(allItemsObject);
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
    async function loadAllData() {
      try {
        await Promise.all([
          startupTrailersData(),
          startupTrendingData(),
          startupByPlatformData(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (onLoadComplete) onLoadComplete();
      }
    }
  }, [onLoadComplete]);

  return (
    <>
      <main>
        <section>
          <div className={styles.welcome_wrapper}>
            <div className={styles.welcome_text}>
              <h1>Welcome!</h1>
              <h2>
                Millions of movies,TV shows and people to discover. Explore now.
              </h2>
            </div>
            <div className={styles.trailers_container}>
              {loading ? (
                <div className={styles.spinner_wrapper}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                trailersData.length > 0 && <Carousel items={trailersData} />
              )}
            </div>
          </div>
        </section>
        <section>
          <div className={styles.trending_container}>
            {loading ? (
              <div className={styles.spinner_wrapper}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              trendingData.length > 0 && (
                <PosterGallery title="Trending" tabsData={trendingData} />
              )
            )}
          </div>
        </section>
        <section>
          <div className={styles.byPlatform_container}>
            {loading ? (
              <div className={styles.spinner_wrapper}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              byPlatformData.length > 0 && (
                <PosterGallery
                  title="Popular"
                  subtitle="byPlatform"
                  tabsData={byPlatformData}
                />
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

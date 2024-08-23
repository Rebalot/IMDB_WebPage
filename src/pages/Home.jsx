import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from '../assets/styles/Home.module.css'
import Carousel from "../components/Carousel";

const Home = () => {
    const urlMovieBase = 'https://api.themoviedb.org/3/discover/movie';
    const urlTVBase = 'https://api.themoviedb.org/3/discover/tv';

    const [listaMovieProximas, setListaMovieProximas] = useState([]);
    const [listaMovieTrailers, setListaMovieTrailers] = useState([]);

    const [listaTVProximas, setListaTVProximas] = useState([]);
    const [listaTVTrailers, setListaTVTrailers] = useState([]);

    const [trailersData, setTrailersData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
        }
    };
    ///////////////////////////
    useEffect(() => {
        async function obtenerListaProximas() {
            //primary_release_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01)
            const urlMovie = `${urlMovieBase}?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-08-15&sort_by=popularity.desc`;
            
            //first_air_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01), with_origin_country (US, para evitar que hayan muchos resultados de origen cn, kr, jp que no suelen ser de gusto general)
            const urlTV = `${urlTVBase}?first_air_date.gte=2024-08-15&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US`;
    
            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    fetch(urlMovie, options),
                    fetch(urlTV, options)
                ]);
    
                const movieData = await movieResponse.json();
                const tvData = await tvResponse.json();
    
                setListaMovieProximas(movieData.results);
                setListaTVProximas(tvData.results);
            } catch (error) {
                console.error('Error al obtener data', error);
            }
        }
    
        obtenerListaProximas();
    }, []);
    
    useEffect(() => {
        async function obtenerListaConVideos(tipo, arrayAIterarProximas) {
            if (arrayAIterarProximas.length === 0) return;
            // Iterar sobre cada película para obtener todos los videos disponibles y posteriormente obtener unicamente el que sea el trailer oficial
            const listaVideosPromises = arrayAIterarProximas.map(async (elemento) => {
                //elemento es cada una de las peliculas o tvshows próximos, con el fin de obtener el id y posteriormente buscar sus videos disponibles
                const videosUrl = `https://api.themoviedb.org/3/${tipo}/${elemento.id}/videos`;
    
                const response = await fetch(videosUrl, options);
                if (!response.ok) {
                    throw new Error(`Error al obtener videos de ${elemento.id}`);
                }
                const videosData = await response.json();
                
                // Buscar el trailer oficial dentro de la propiedad results, donde se encuentran los videos disponibles de la pelicula/tvshow.
                const officialTrailer = videosData.results.find((video) =>
                    video.type === "Trailer" && video.name === "Official Trailer"
                );
                
                //Matiene las propiedades originales y agrega la propiedad official_trailer, en caso de no contar con uno, el value será null.
                return {
                    ...elemento,
                    official_trailer: officialTrailer ? officialTrailer : null
                };
            });
    
            const updatedElemento = await Promise.all(listaVideosPromises);
    
            if (tipo === 'movie') {
                setListaMovieTrailers(updatedElemento);
            } else if (tipo === 'tv') {
                setListaTVTrailers(updatedElemento);
            }
        }
    
        if (listaMovieProximas.length > 0) {
            obtenerListaConVideos('movie', listaMovieProximas);
        }
    
        if (listaTVProximas.length > 0) {
            obtenerListaConVideos('tv', listaTVProximas);
        }
    }, [listaMovieProximas, listaTVProximas]);


    ///////////////////////////
    // Transformar data para movies
    useEffect(() => {
        if (listaMovieTrailers.length > 0) {
            transformarDataCarousel('movie');
        }
    
        function transformarDataCarousel(tipo) {
            let arrayAFiltrarTrailers;
    
            if (tipo === 'movie') {
                console.log("Movie trailers: ", listaMovieTrailers);
                arrayAFiltrarTrailers = listaMovieTrailers;
            }
    
            const listaConTrailerDisponible = arrayAFiltrarTrailers.filter((movie) => movie.official_trailer !== null);
            const dataEndpoints = listaConTrailerDisponible.map((elemento) => {
                return {
                    title: elemento.original_title,
                    image: `https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/${elemento.backdrop_path}`,
                    trailerUrl: `https://www.youtube.com/watch?v=${elemento.official_trailer.key}`
                };
            });
            setTrailersData((prevData) => ({
                ...prevData,
                movie_trailer: dataEndpoints
            }));
        }
    }, [listaMovieTrailers]);
    
    // Transformar data para TV shows
    useEffect(() => {
        if (listaTVTrailers.length > 0) {
            transformarDataCarousel('tv');
        }
    
        function transformarDataCarousel(tipo) {
            let arrayAFiltrarTrailers;
    
            if (tipo === 'tv') {
                console.log("TV trailers: ", listaTVTrailers);
                arrayAFiltrarTrailers = listaTVTrailers;
            }
    
            const listaConTrailerDisponible = arrayAFiltrarTrailers.filter((tvShow) => tvShow.official_trailer !== null);
            const dataEndpoints = listaConTrailerDisponible.map((elemento) => {
                return {
                    title: elemento.original_name,
                    image: `https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/${elemento.backdrop_path}`,
                    trailerUrl: `https://www.youtube.com/watch?v=${elemento.official_trailer.key}`
                };
            });
            setTrailersData((prevData) => ({
                ...prevData, 
                tvshow_trailer: dataEndpoints
            }));
        }
    }, [listaTVTrailers]);
    ////////////////////////////////
    useEffect(() => {
        if(trailersData.hasOwnProperty('movie_trailer') && trailersData.hasOwnProperty('tvshow_trailer')) {

            console.log('trailers data: ', trailersData)
            const moviesTrailersPopulares = trailersData.movie_trailer.slice(0,4);
            const tvTrailersPopulares = trailersData.tvshow_trailer.slice(0,4);

            const combinedTrailers = [];
            let i = 0;
            while (i < moviesTrailersPopulares.length || i < tvTrailersPopulares.length) {
                if (i < moviesTrailersPopulares.length) {
                    combinedTrailers.push(moviesTrailersPopulares[i]);
                }
                if (i < tvTrailersPopulares.length) {
                    combinedTrailers.push(tvTrailersPopulares[i]);
                }
                i++;
            }
            setCarouselData(combinedTrailers)
        }
        
    
    }, [trailersData]);
    ///////////
    useEffect(() => {
        console.log(carouselData);
    }, [carouselData]);

    return (
        <>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Welcome!</h1>
                        <h2>Millions of movies,TV shows and people to discover. Explore now.</h2>
                        <div className="mt-4">
                            {carouselData.length > 0 && (
                                <Carousel items={carouselData} />
                            )}
                        </div>
                    </div>
                    <SearchBar></SearchBar>
                </section>
            </main>
        </>
    )
}

export default Home;
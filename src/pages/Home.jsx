import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from '../assets/styles/Home.module.css'
import Carousel from "../components/Carousel";

const Home = () => {
    const urlMovie = 'https://api.themoviedb.org/3/discover/movie';
    const urlTV = 'https://api.themoviedb.org/3/discover/tv';

    const [listaMovieProximas, setListaMovieProximas] = useState([]);
    const [listaMovieTrailers, setListaMovieTrailers] = useState([]);
    const [listaTVProximas, setListaTVProximas] = useState([]);
    const [listaTVTrailers, setListaTVTrailers] = useState([]);
    const [carouselData, setCarouselData] = useState([]);
    useEffect(() => {
        obtenerMoviesProximas();
        obtenerTVProximas();
        async function obtenerMoviesProximas() {
            const newUrl = `${urlMovie}?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-08-01&sort_by=popularity.desc`;
            //primary_release_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01)
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                }
            };
            try {
                const response = await fetch(newUrl, options);
                if (!response.ok) {
                    throw new Error('Error al obtener data');
                }
                const data = await response.json();
                const listaMovies = data.results;
                setListaMovieProximas(listaMovies);
                
            } catch (error) {
                console.error('Error al obtener data', error);
            }
        }
        async function obtenerTVProximas() {
            const newUrl = `${urlTV}?first_air_date.gte=2024-08-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US`;
            //first_air_date.gte (las estrenadas o próximas arriba de una fecha ej. 2024-08-01), with_origin_country (US, para evitar que hayan muchos resultados de origen cn, kr, jp que no suelen ser de gusto general)
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                }
            };
            try {
                const response = await fetch(newUrl, options);
                if (!response.ok) {
                    throw new Error('Error al obtener data');
                }
                const data = await response.json();
                setListaTVProximas(data.results);
            } catch (error) {
                console.error('Error al obtener data', error);
            }
        }
    }, []);
    useEffect(() => {
        obtenerMovieVideos();
        async function obtenerMovieVideos() {
            if (listaMovieProximas.length === 0) return;
            // Iterar sobre cada película para obtener todos los videos disponibles y posteriormente obtener unicamente el que sea el trailer oficial
            const movieVideosPromises = listaMovieProximas.map(async (movie) => {
                const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                    }
                };
                const videosResponse = await fetch(videosUrl, options);
                if (!videosResponse.ok) {
                    throw new Error('Error al obtener detalles de la película');
                }
                const videosData = await videosResponse.json();

                // Buscar el trailer oficial
                const officialTrailer = videosData.results.find((video) => 
                    video.type === "Trailer" && video.name === "Official Trailer"
                );
                //Matiene las propiedades originales y agrega la propiedad official_trailer, en caso de no contar con uno, el value será null.
                return {
                    ...movie,
                    official_trailer: officialTrailer ? officialTrailer : null
                };
            });
    
            const updatedMovies = await Promise.all(movieVideosPromises);
    
            setListaMovieTrailers(updatedMovies);
        }
    }, [listaMovieProximas]);
    useEffect(() => {
        console.log('TV Próximas:', listaTVProximas);
    }, [listaTVProximas]);
    useEffect(() => {
        console.log("Movie trailers: ", listaMovieTrailers);
        const moviesConTrailer = listaMovieTrailers.filter((movie)=> movie.official_trailer !== null);
        const dataEndpoints = moviesConTrailer.map((movie) => {
            return{
                title: movie.original_title,
                image: `https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/${movie.backdrop_path}`,
                trailerUrl: `https://www.youtube.com/watch?v=${movie.official_trailer.key}`
            };
        });

        setCarouselData(dataEndpoints);
    }, [listaMovieTrailers]);
    return (
        <>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Welcome!</h1>
                        <h2>Millions of movies,TV shows and people to discover. Explore now.</h2>
                        <div>
                            <Carousel items={carouselData}></Carousel>
                        </div>
                    </div>
                    <SearchBar></SearchBar>
                </section>
            </main>
        </>
    )
}

export default Home;
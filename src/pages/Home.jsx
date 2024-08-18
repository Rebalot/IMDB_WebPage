import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from '../assets/styles/Home.module.css'
import Carousel from "../components/Carousel";

const Home = () => {
    const urlMovie = 'https://api.themoviedb.org/3/discover/movie'
    useEffect(() => {
        async function obtenerMoviesTendencia() {
            const newUrl = `${urlMovie}`;
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
                const dataObtenida = await response.json();
                console.log('Data obtenida correctamente');
                return dataObtenida;
            } catch (error) {
                console.error('Error al obtener data', error);
            }
        }

        obtenerMoviesTendencia();

        async function obtenerTrailersTendenciaYoutube() {
            const apiKey = 'AIzaSyCgljdJ1kdRAmv2mrHhbEhFE1ZDjL0HCE8';
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=1&key=${apiKey}`;

            fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    }, []);
    
    const items = [
        { title: 'Alien', image: "https://linktoimage1.com", trailerUrl: "https://www.youtube.com/watch?v=cj85e-1tgyI&t=416s" },
        { title: 'Alien',  image: "https://linktoimage2.com", trailerUrl: "https://www.youtube.com/embed/trailer2" },
        { title: 'Alien',  image: "https://linktoimage3.com", trailerUrl: "https://www.youtube.com/embed/trailer3" },
        { title: 'Alien',  image: "https://linktoimage1.com", trailerUrl: "https://www.youtube.com/embed/trailer1" },
        { title: 'Alien',  image: "https://linktoimage2.com", trailerUrl: "https://www.youtube.com/embed/trailer2" },
        { title: 'Alien',  image: "https://linktoimage3.com", trailerUrl: "https://www.youtube.com/embed/trailer3" },
    ];
    return (
        <>
            <Navbar></Navbar>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Welcome!</h1>
                        <h2>Millions of movies,TV shows and people to discover. Explore now.</h2>
                        <div>
                            <Carousel items={items}></Carousel>
                        </div>
                    </div>
                    <SearchBar></SearchBar>
                </section>
            </main>
        </>
    )
}

export default Home;
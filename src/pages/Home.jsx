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
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Welcome!</h1>
                        <h2>Millions of movies,TV shows and people to discover. Explore now.</h2>
                        <div>
                            <Carousel></Carousel>
                        </div>
                    </div>
                    <SearchBar></SearchBar>
                </section>
            </main>
        </>
    )
}

export default Home;
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import styles from '../assets/styles/Home.module.css'
import Carousel from "../components/Carousel";

const Popular = () => {
    const urlMovie = 'https://api.themoviedb.org/3/movie/popular'

    const [listaPeliculas, setListaPeliculas] = useState([])

    useEffect(() => {
        const consultarPeliculas = async () => {
            const url = "https://api.themoviedb.org/3/discover/movie"
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
                }
            };
            try {
                const response = await fetch(url, options)
                const json = await response.json()
                console.log(json)
                setListaPeliculas(json.results);
                console.log(listaPeliculas)
            }
            catch (e) {
                console.log(e)
            }
        }
        consultarPeliculas();


        /*    async function obtenerTrailersTendenciaYoutube() {
                const apiKey = 'AIzaSyCgljdJ1kdRAmv2mrHhbEhFE1ZDjL0HCE8';
                const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=1&key=${apiKey}`;
    
                fetch(url)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error));
            }*/
    }, []);

    /*  const items = [
          { title: 'Alien', image: "https://linktoimage1.com", trailerUrl: "https://www.youtube.com/watch?v=cj85e-1tgyI&t=416s" },
          { title: 'Alien', image: "https://linktoimage2.com", trailerUrl: "https://www.youtube.com/embed/trailer2" },
          { title: 'Alien', image: "https://linktoimage3.com", trailerUrl: "https://www.youtube.com/embed/trailer3" },
          { title: 'Alien', image: "https://linktoimage1.com", trailerUrl: "https://www.youtube.com/embed/trailer1" },
          { title: 'Alien', image: "https://linktoimage2.com", trailerUrl: "https://www.youtube.com/embed/trailer2" },
          { title: 'Alien', image: "https://linktoimage3.com", trailerUrl: "https://www.youtube.com/embed/trailer3" },
      ];*/

    return (
        <>
            <main>
                <section>
                    <div className={styles.welcome_wrapper}>
                        <h1>Bienvenido</h1>
                        <h2>Peliculas populares</h2>
                        <div>
                            <ul>
                            {
                listaPeliculas.map((pelicula, index) => {
                    return (
                        <li key={index}>{pelicula.title.charAt(0).toUpperCase()+pelicula.title.slice(1)}</li>
                    )
                })
            }
                            </ul>

                        </div>
                    </div>
                    <SearchBar></SearchBar>
                </section>
            </main>
        </>
    )
}

export default Popular;
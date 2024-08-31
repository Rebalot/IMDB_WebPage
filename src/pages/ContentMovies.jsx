import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink, useParams } from "react-router-dom";
import styles from "../assets/styles/ContentMovies.module.css";
import ItemCardComponent from "../components/ItemCard";

const ContentMovies = () => {
  const [moviesList, setMoviesList] = useState([]);
  const { section } = useParams();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };
  useEffect(() => {
    const consultarMovieSection = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${section}`,
          options
        );

        const json = await response.json();
        // console.log(json)
        setMoviesList(json.results);
      } catch (e) {
        console.log(e);
      }
    };
    consultarMovieSection();
  }, []);


  return (
    <>
      <main className={styles.main_movies}>
        <div className={styles.content_wrapper}>
        <h1>Popular Movies</h1>
        <div className={styles.movies_sections}>
          <aside></aside>
          <section>
          <div className={styles.movies_grid}>
              {moviesList.map((movie, index) => {
                return (
                  <NavLink key={index} className={styles.movie_card} to={`/movie/detail/${movie.id}`}>
                    <ItemCardComponent itemData={movie} />
                  </NavLink>
                );
              })}
            </div>
          </section>
        </div>
        </div>
      </main>
    </>
  );
};

export default ContentMovies;

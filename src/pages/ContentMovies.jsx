import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink, useParams } from "react-router-dom";
import styles from "../assets/styles/ContentMovies.module.css";
import ItemCardComponent from "../components/ItemCard";

const ContentMovies = () => {
  const { section } = useParams();
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o'
    }
};
  const consultarMovieSection = async (pageNum) => {
    setLoading(true); // Inicia la carga
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${section}?language=en-US&page=${pageNum}`, options);
      const data = await response.json();
      console.log('data list: ', data)
      setMoviesList((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('Section changed');
    setMoviesList([]); // Reinicia la lista de películas
    setPage(1); // Reinicia la página
  }, [section]);

  // Efecto para cuando cambia la página o la sección
  useEffect(() => {
    consultarMovieSection(page);
  }, [page, section]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Incrementa la página
  };


  return (
    <>
      <main className={styles.main_movies}>
        <div className={styles.content_wrapper}>
        <h1>Popular Movies</h1>
        <div className={styles.movies_sections}>
          <aside>
            <div className={styles.filter_panel}>
              
            </div>
          </aside>
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
          <button className="button" onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
          </section>
        </div>
        </div>
      </main>
    </>
  );
};

export default ContentMovies;

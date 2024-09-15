import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { NavLink, useParams } from "react-router-dom";
import styles from "../assets/styles/ContentMovies.module.css";
import ItemCardComponent from "../components/ItemCard";
import Filter from "../components/FilterMovies";
import Dropdown from "../components/DropdownChevron";
import Spinner from "../components/Spinner";
const ContentMovies = ({ onLoadComplete, onLoading }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("popular");
  const [sectionName, setSectionName] = useState("All");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };
  const consultarMovieSection = async (pageNum) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${section}?language=en-US&page=${pageNum}&region=MX`,
        options
      );
      const data = await response.json();
      console.log("data list: ", data);
      setMoviesList((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      if (onLoadComplete) onLoadComplete();
    }
  };
  useEffect(() => {
    onLoading();
    setLoading(true); // Inicia la carga
    console.log("Section changed");
    if (section === "popular") {
      setSectionName("All");
    } else if (section === "now_playing") {
      setSectionName("Now Playing");
    } else if (section === "upcoming") {
      setSectionName("Upcoming");
    } else if (section === "top_rated") {
      setSectionName("Top Rated");
    }
    setMoviesList([]);
    setPage(1);
  }, [section]);

  useEffect(() => {
    consultarMovieSection(page);
  }, [page, section]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); //la page actual + 1
  };

  return (
    <>
      <main className={styles.main_movies}>
        <div className={styles.content_wrapper}>
          <div className={styles.header}>
            <h1>Movies</h1>
            <div className={styles.subtitle}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 10 24"
                >
                  <rect
                    x="11"
                    y="4"
                    width="1"
                    height="16"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h2>{sectionName}</h2>
              <Dropdown
                className={styles.subtitle_dropdown}
                items={["All", "Now Playing", "Upcoming", "Top Rated"]}
                onClickItems={[
                  () => setSection("popular"),
                  () => setSection("now_playing"),
                  () => setSection("upcoming"),
                  () => setSection("top_rated"),
                ]}
              />
            </div>
          </div>

          <div className={styles.movies_sections}>
            <aside>
              <Filter></Filter>
            </aside>
            <section>
              <div className={styles.movies_grid}>
                {loading ? (
                  <Spinner />
                ) : (
                  moviesList.length > 0 &&
                  moviesList.map((movie, index) => (
                    <NavLink
                      key={movie.id} // Usar un identificador único en lugar del índice
                      className={styles.movie_card}
                      to={`/movie/detail/${movie.id}`}
                    >
                      <ItemCardComponent itemData={movie} />
                    </NavLink>
                  ))
                )}
              </div>
              {loading ? (
                <></>
                ) : (
                  <button
                className="button"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
                )}
              
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContentMovies;

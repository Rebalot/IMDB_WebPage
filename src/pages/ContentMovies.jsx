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
  const [filter, setFilter] = useState(false); //filter data
  
  const sectionNames = {
    popular: "All",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
    top_rated: "Top Rated",
  };
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDEzNjFjN2U4MzQzYmU5NTdiNGE1MGU1OWIxNzNiZiIsIm5iZiI6MTcyMzE3MzgxOC4wMzYxMDUsInN1YiI6IjY2YjQzNTFmYjJkMWM1NWM3OTZmMjNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L24aOuGVERuuekN14gSCAXJMte02hky1GALzw9O1w4o",
    },
  };
  const consultarMovieSection = async (pageNum, filterValue = false) => {
    let newURL;
    if (!filterValue) {
      newURL = `https://api.themoviedb.org/3/movie/${section}?language=en-US&page=${pageNum}&region=MX`;
    } else {
      newURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=${filterValue.sort}&region=MX`;
    }
  
    console.log(newURL);
    try {
      const response = await fetch(newURL, options);
      const data = await response.json();
  
      setMoviesList((prevMovies) =>
        pageNum === 1 ? data.results : [...prevMovies, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      if (onLoadComplete) onLoadComplete();
    }
  };
  

  useEffect(() => {
    console.log('section', section)
    
    const fetchMovies = async () => {
      setMoviesList([]);
      setPage(1);
      setLoading(true);
      onLoading();

      if (filter && section === 'popular') {
        consultarMovieSection(1, filter);
      } 
      if(!filter || section ==! 'popular'){
        consultarMovieSection(1);
      }
    };

    fetchMovies();
  }, [filter, section]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      if (filter) {
        consultarMovieSection(page, filter);
      } else {
        consultarMovieSection(page);
      }
    }
  }, [page]);

  const handleFormSubmit = (filterValues) => {
    console.log("Filtros seleccionados en el formulario:", filterValues);
    setFilter(filterValues);
    setSection("popular");
  };
  const handleDropdown = (sectionValue) => {
    console.log(`Sección seleccionada: ${sectionValue}`);
    setFilter(false);   
    setSection(sectionValue);
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
              <h2>{sectionNames[section]}</h2>
              <Dropdown
                className={styles.subtitle_dropdown}
                items={["All", "Now Playing", "Upcoming", "Top Rated"]}
                onClickItems={["popular", "now_playing", "upcoming", "top_rated"].map((sectionValue) => () => handleDropdown(sectionValue))}
              />
            </div>
          </div>

          <div className={styles.movies_sections}>
            <aside>
              <Filter handleFormSubmit={handleFormSubmit}></Filter>
            </aside>
            <section>
              <div className={styles.movies_grid}>
                {loading ? (
                  <Spinner />
                ) : (
                  moviesList.length > 0 &&
                  moviesList.map((movie, index) => (
                    <NavLink
                      key={`${movie.id}-${index}`}
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

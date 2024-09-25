import { NavLink } from "react-router-dom";
import styles from "../assets/styles/ContentPage.module.css";
import ItemCardComponent from "../components/ItemCard";
import Filter from "../components/FilterContent";
import Dropdown from "../components/DropdownChevron";
import Spinner from "../components/Spinner";
import useMedia from "../hooks/useMedia";


const ContentMovies = () => {
  
  const sectionNames = {
    popular: "All",
    now_playing: "Now Playing",
    upcoming: "Upcoming",
    top_rated: "Top Rated",
  };
  
  const filterOptions = {
    sortOptions: [
      { value: 'popularity.desc', label: 'Popularity Descending' },
      { value: 'popularity.asc', label: 'Popularity Ascending' },
      { value: 'vote_average.desc', label: 'Rating Descending' },
      { value: 'vote_average.asc', label: 'Rating Ascending' },
      { value: 'primary_release_date.desc', label: 'Release Date Descending' },
      { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
      { value: 'title.asc', label: 'Title (A-Z)' },
      { value: 'title.desc', label: 'Title (Z-A)' },
    ],
    genreOptions: [
      {
        value: 28,
        label: "Action"
      },
      {
        value: 12,
        label: "Adventure"
      },
      {
        value: 16,
        label: "Animation"
      },
      {
        value: 35,
        label: "Comedy"
      },
      {
        value: 80,
        label: "Crime"
      },
      {
        value: 99,
        label: "Documentary"
      },
      {
        value: 18,
        label: "Drama"
      },
      {
        value: 10751,
        label: "Family"
      },
      {
        value: 14,
        label: "Fantasy"
      },
      {
        value: 36,
        label: "History"
      },
      {
        value: 27,
        label: "Horror"
      },
      {
        value: 10402,
        label: "Music"
      },
      {
        value: 9648,
        label: "Mystery"
      },
      {
        value: 10749,
        label: "Romance"
      },
      {
        value: 878,
        label: "Science Fiction"
      },
      {
        value: 10770,
        label: "TV Movie"
      },
      {
        value: 53,
        label: "Thriller"
      },
      {
        value: 10752,
        label: "War"
      },
      {
        value: 37,
        label: "Western"
      }
    ]
  }

  const {
    mediaList: moviesList,
    loading,
    section,
    handleFormSubmit,
    handleDropdown,
    handleLoadMore,
  } = useMedia("popular", "movie");

  return (
    <>
      <main className={styles.main_page}>
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
                items={Object.values(sectionNames)}
                onClickItems={Object.keys(sectionNames).map((sectionValue) => () => handleDropdown(sectionValue))}
              />
            </div>
          </div>

          <div className={styles.page_sections}>
            <aside>
              <Filter handleFormSubmit={handleFormSubmit} filterOptions={filterOptions} />
            </aside>
            <section>
              <div className={styles.page_grid}>
                {loading ? (
                  <Spinner />
                ) : (
                  moviesList.length > 0 &&
                  moviesList.map((movie, index) => (
                    <NavLink
                      key={`${movie.id}-${index}`}
                      className={styles.card}
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

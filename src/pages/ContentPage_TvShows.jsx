import { NavLink } from "react-router-dom";
import styles from "../assets/styles/ContentPage.module.css";
import ItemCardComponent from "../components/ItemCard";
import Filter from "../components/FilterContent";
import Dropdown from "../components/DropdownChevron";
import Spinner from "../components/Spinner";
import useMedia from "../hooks/useMedia";


const ContentTvShows = () => {

  const sectionNames = {
    popular: "All",
    airing_today: "Airing Today",
    on_the_air: "On TV",
    top_rated: "Top Rated",
  };

  const filterOptions = {
    sortOptions: [
      { value: 'popularity.desc', label: 'Popularity Descending' },
      { value: 'popularity.asc', label: 'Popularity Ascending' },
      { value: 'vote_average.desc', label: 'Rating Descending' },
      { value: 'vote_average.asc', label: 'Rating Ascending' },
      { value: 'first_air_date.desc', label: 'First Air Date Descending' },
      { value: 'first_air_date.asc', label: 'First Air Date Ascending' },
      { value: 'name.asc', label: 'Name (A-Z)' },
      { value: 'name.desc', label: 'Name (Z-A)' },
    ],
    genreOptions: [
      {
        value: 10759,
        label: "Action & Adventure"
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
        value: 10762,
        label: "Kids"
      },
      {
        value: 9648,
        label: "Mystery"
      },
      {
        value: 10763,
        label: "News"
      },
      {
        value: 10764,
        label: "Reality"
      },
      {
        value: 10765,
        label: "Sci-Fi & Fantasy"
      },
      {
        value: 10766,
        label: "Soap"
      },
      {
        value: 10767,
        label: "Talk"
      },
      {
        value: 10768,
        label: "War & Politics"
      },
      {
        value: 37,
        label: "Western"
      }
    ]
  }

  const {
    mediaList: tvList,
    loading,
    section,
    handleFormSubmit,
    handleDropdown,
    handleLoadMore,
  } = useMedia("popular", "tv");

  return (
    <>
      <main className={styles.main_page}>
        <div className={styles.content_wrapper}>
          <div className={styles.header}>
            <h1>Tv Shows</h1>
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
                  tvList.length > 0 &&
                  tvList.map((tv, index) => (
                    <NavLink
                      key={`${tv.id}-${index}`}
                      className={styles.card}
                      to={`/tv/detail/${tv.id}`}
                    >
                      <ItemCardComponent itemData={tv} />
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

export default ContentTvShows;

import { useEffect, useState } from "react";
import styles from "../assets/styles/FilterMovies.module.css";
import Select from 'react-select';
import { Button } from "react-bootstrap";
const FilterComponent = ({ handleFormSubmit }) => {
  const [sortFilter, setSortFilter] = useState('popularity.desc');
  const [genresFilter, setGenresFilter] = useState([]);
const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'primary_release_date.desc', label: 'Release Date Descending' },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
]
const genresOptions = [
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
const handleSubmit = (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto del form
  handleFormSubmit({
    sort: sortFilter,
    genres: genresFilter.map((genre) => genre.value), // Extrae los valores seleccionados
  });
};
  return (
    <>
    
      <div className={styles.filter_panel}>
      <form onSubmit={handleSubmit}>
        <section>
        <h4>Sort results by:</h4>
        <Select name={'SortFilter'} options={sortOptions} defaultValue={sortOptions[0]} isSearchable={false} onChange={(selectedOption)=>setSortFilter(selectedOption.value)}/>
        </section>
        <section>
        <h4>Genres:</h4>
          <Select name={'GenresFilter'} options={genresOptions} isMulti isSearchable={false} onChange={(selectedGenres) => setGenresFilter(selectedGenres || [])}/>
        </section>
        <div className={styles.filter_btns}>
          <button className={`${styles.btn_search} ${styles.btn_filter}`} type="submit" title="Search">SEARCH</button>
          <button className={`${styles.btn_erase} ${styles.btn_filter}`} type="button" title="Erase filters">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="24px" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default FilterComponent;

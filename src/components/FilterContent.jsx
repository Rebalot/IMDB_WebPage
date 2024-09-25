import { useState } from "react";
import styles from "../assets/styles/FilterContent.module.css";
import Select from 'react-select';


const FilterComponent = ({ filterOptions, handleFormSubmit }) => {
  const [sortFilter, setSortFilter] = useState('popularity.desc');
  const [genresFilter, setGenresFilter] = useState([]);
const sortOptions = filterOptions.sortOptions
const genreOptions = filterOptions.genreOptions
const handleSubmit = (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto del form
  handleFormSubmit({
    sort: sortFilter,
    genres: genresFilter.map((genre) => genre.value).join('%2C'), // Extrae los valores seleccionados
  });
};
const handleEraseFilters = () => {
  setSortFilter(sortOptions[0].value);
  setGenresFilter([]); 

  handleFormSubmit(false);
};
  return (
    <>
    
      <div className={styles.filter_panel}>
      <form onSubmit={handleSubmit}>
        <section>
        <h4>Sort results by:</h4>
        <Select name={'SortFilter'} value={sortOptions.find(option => option.value === sortFilter)} options={sortOptions} defaultValue={sortOptions[0]} isSearchable={false} onChange={(selectedOption)=>setSortFilter(selectedOption.value)}/>
        </section>
        <section>
        <h4>Genres:</h4>
          <Select name={'GenresFilter'} value={genresFilter} options={genreOptions} isMulti isSearchable={false} onChange={(selectedGenres) => setGenresFilter(selectedGenres || [])}/>
        </section>
        <div className={styles.filter_btns}>
          <button className={`${styles.btn_search} ${styles.btn_filter}`} type="submit" title="Search">SEARCH</button>
          <button className={`${styles.btn_erase} ${styles.btn_filter}`} type="button" title="Erase filters" onClick={handleEraseFilters}>
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

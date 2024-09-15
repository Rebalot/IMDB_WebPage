import { useEffect, useState } from "react";
import styles from "../assets/styles/FilterMovies.module.css";
import Select from './SelectorSingle'
const FilterComponent = () => {
  

const options = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'primary_release_date.desc', label: 'Release Date Descending' },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
]
  return (
    <>
      <div className={styles.filter_panel}>
        <section>
        <h4>Sort results by:</h4>
        <Select name={'SortResults'} options={options} />
        </section>
        
      </div>
    </>
  );
};

export default FilterComponent;

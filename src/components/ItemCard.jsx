import { NavLink } from "react-router-dom";
import styles from "../assets/styles/ItemCard.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
export function ItemCardComponent({ itemData }) {
  const imgURL = `https://media.themoviedb.org/t/p/w220_and_h330_face/${itemData.poster_path}`
  console.log(itemData)
  function rating(value) {
    return Math.round(value * 10);
  }
  function convertDate(dateString) {
  const [year, month, day] = dateString.split('-');

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`;
}
    return (
      <div className={styles.card}>
        <div className={styles.card_poster} >
          <img className={styles.card_img} src={imgURL}></img>
          <div className={styles.card_content}>
            <button className={styles.btn_a}>
              <span>See details</span>
              <svg
            className="icon-external-link"
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
            <path d="M11 13l9 -9"></path>
            <path d="M15 4h5v5"></path>
          </svg>
            </button>
            
            <p className={styles.card_overview}>
              {itemData.overview}
            </p>
          </div>
        </div>
        <div className={styles.card_info}>
        <div className={styles.card_rating}>
            <CircularProgressbar
              value={rating(itemData.vote_average)}
              minValue={0}
              maxValue={100}
              text={`${
                rating(itemData.vote_average) === 0
                  ? "N/R"
                  : `${rating(itemData.vote_average)}%`
              }`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,
            
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',
            
                // Text size
                textSize: '28px',
            
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
            
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
            
                // Colors
                pathColor: '#f6c700',
                textColor: '#ffffff',
                trailColor: '#000000',
                backgroundColor: '#000000',
              })}
            >
            </CircularProgressbar>
          </div>
          <div className={styles.card_title_date}>
          <h2 className={styles.card_title}>{itemData.title}</h2>
          <span>{convertDate(itemData.release_date)}</span>
          </div>
        </div>
      </div>
  );
}
export default ItemCardComponent;
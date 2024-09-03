import { NavLink } from "react-router-dom";
import styles from "../assets/styles/ItemCard.module.css";
export function ItemCardComponent({ itemData }) {
  const imgURL = `https://media.themoviedb.org/t/p/w220_and_h330_face/${itemData.poster_path}`

    return (
        <div className={styles.card} style={{ backgroundImage: `url(${imgURL})` }}>
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
          <h2 className={styles.card_title}>{itemData.title}</h2>
          <p className={styles.card_body}>
            {itemData.overview}
          </p>
        </div>
      </div>
  );
}
export default ItemCardComponent;
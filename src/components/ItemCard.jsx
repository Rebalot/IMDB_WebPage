import { NavLink } from "react-router-dom";
import styles from "../assets/styles/ItemCard.module.css";
export function ItemCardComponent({ itemData }) {
  const imgURL = `https://media.themoviedb.org/t/p/w220_and_h330_face/${itemData.poster_path}`
  console.log(itemData)
    return (
        <div className={styles.card} style={{ backgroundImage: `url(${imgURL})` }}>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>{itemData.title}</h2>
          <p className={styles.card_body}>
            {itemData.overview}
          </p>
        </div>
      </div>
  );
}
export default ItemCardComponent;
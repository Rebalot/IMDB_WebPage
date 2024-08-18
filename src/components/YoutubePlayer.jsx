import classNames from "classnames";
import { useState } from "react";
import YoutubePlayer from "react-player/youtube";
import styles from '../assets/styles/YTPlayer.module.css'
export function YoutubePlayerComponent({ trailerUrl }) {
    return (
      <YoutubePlayer 
        url={trailerUrl}
        controls
        className={classNames(styles.player)}
        height='100%'
        width='100%'
      />
  );
}
export default YoutubePlayerComponent;
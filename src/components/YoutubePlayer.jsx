import classNames from "classnames";
import { useState } from "react";
import YoutubePlayer from "react-player/youtube";

export function YoutubePlayerComponent({ trailerUrl }) {
    return (
      <YoutubePlayer 
        url={trailerUrl}
        controls
        height='100%'
        width='100%'
      />
  );
}
export default YoutubePlayerComponent;
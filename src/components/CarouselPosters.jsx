import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "../assets/styles/CarouselPosters.module.css";

function PostersComponent({ postersData }) {
  // console.log(postersData);
  //Setting for slick-carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function rating(value) {
    return Math.round(value * 10);
  }
  function convertDate(dateString) {
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {postersData.map((posterData, index) => (
          
            <div className={classNames(styles.poster_container)} key={index}>
              <NavLink
            to={`/${
              posterData.tipo === "movie"
                ? `movie/detail/${posterData.id}`
                : `tv/detail/${posterData.id}`
            }`}
            
          >
              <img className={styles.poster_img} src={posterData.imgUrl}></img>
              
              <div className={styles.poster_info}>
              <div
                className={styles.poster_raiting_container}
              >
                <CircularProgressbar
                  className={styles.poster_raiting}
                  value={rating(posterData.rating)}
                  minValue={0}
                  maxValue={100}
                  text={`${
                    rating(posterData.rating) === 0
                      ? "N/R"
                      : `${rating(posterData.rating)}%`
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
                ></CircularProgressbar>
              </div>
              <h4 className={styles.poster_title}>{posterData.title}</h4>
              <p className={styles.poster_releaseDate}>{convertDate(posterData.releaseDate)}</p>
              </div>
              </NavLink>
            </div>
          
        ))}
      </Slider>
    </div>
  );
}
export default PostersComponent;

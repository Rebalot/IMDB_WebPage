import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
import styles from "../assets/styles/CarouselPosters.module.css";
import { NavLink } from "react-router-dom";

function PostersComponent({ postersData }) {
// console.log(postersData)
//Setting for slick-carousel
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {postersData.map((posterData, index) => (
        <NavLink to={`/${posterData.tipo === 'movie' ? `movie/${posterData.id}` : `tv/${posterData.id}`}`} key={index}>
          <div className={classNames(styles.poster_container)} >
          <img src={posterData.imgUrl}></img>
          <h4>{posterData.title}</h4>
          </div>
        </NavLink>
        
      ))}
      </Slider>
    </div>
  );
}
export default PostersComponent;
import React, { useEffect, useRef, useState } from "react";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import styles from "../assets/styles/PosterGallery.module.css";
import { motion } from "framer-motion";
import CarouselPosters from "./CarouselPosters";
import classNames from "classnames";

function PosterGalleryComponent({ title, subtitle, tabsData }) {
  const swiperRef = useRef(null);
  const [basicActive, setBasicActive] = useState(tabsData[0].tabTitle);

  //For tabs content
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  //For chips (navigation pills animation)
  const Chip = ({ text, selected }) => {
    return (
      <button
        onClick={() => {
          console.log("click en chip: ", text);
          handleBasicClick(text);
        }}
        className={`${
          selected
            ? "text-black font-bold"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId={`pill-tab-${
              subtitle ? `${title}_${subtitle}` : `${title}`
            }`}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-[#f6c700] via-[#f6a700] to-[#f68200] rounded-md"
          ></motion.span>
        )}
      </button>
    );
  };

  const handleTabClick = (swiper, index) => {
    if (swiper) {
      swiper.slideTo(index, 500);
    }
  };

  return (
    <div className={styles.gallery_container}>
      <div className={styles.gallery_header}>
        {subtitle ? (
          <div className={styles.title_container}>
            <h3>{title}</h3>
            <h4 className={styles.subtitle}>{subtitle}</h4>
          </div>
        ) : (
          <h3>{title}</h3>
        )}

        <MDBTabs pills className={`mb-3 ${styles.tabPills}`}>
          <Swiper
            className={styles.swiper_container}
            slidesPerView={"auto"}
            spaceBetween={5}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            <span className={styles.left_grad}></span>
            {tabsData.map((tabData, index) => (
              <SwiperSlide key={index}
              onClick={() => handleTabClick(swiperRef.current, index)}>
                <Chip
                  as={MDBTabsLink}
                  text={tabData.tabTitle}
                  selected={basicActive === tabData.tabTitle}
                  active={basicActive === tabData.tabTitle}
                />
              </SwiperSlide>
            ))}
            <span className={styles.right_grad}></span>
          </Swiper>
        </MDBTabs>
      </div>
      <MDBTabsContent>
        {tabsData.map((tabData, index) => (
          <MDBTabsPane open={basicActive === tabData.tabTitle} key={index}>
            <CarouselPosters
              postersData={tabData.carouselItems}
            ></CarouselPosters>
          </MDBTabsPane>
        ))}
      </MDBTabsContent>
    </div>
  );
}
export default PosterGalleryComponent;

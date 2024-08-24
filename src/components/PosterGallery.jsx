import React, { useEffect, useState } from "react";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import classNames from "classnames";
import styles from "../assets/styles/PosterGallery.module.css";

import { motion } from "framer-motion";

function PosterGalleryComponent({ title, tabsData }) {
  
  const [basicActive, setBasicActive] = useState(tabsData[0].tabTitle);

  //For tabs content
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  //For chips (navigation pills animation)
  const Chip = ({ text, selected, setBasicActive }) => {
    return (
      <button
        onClick={() => {
          console.log("click en chip: ", text);
          handleBasicClick(text);
        }}
        className={`${
          selected
            ? "text-white"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
          ></motion.span>
        )}
      </button>
    );
  };
  useEffect(() => {
    console.log("basicActiveActual: ", basicActive);
  }, [basicActive]);
  return (
    <div className={classNames(styles.gallery_container)}>
      <div className={classNames(styles.gallery_header)}>
        <h3>{title}</h3>

        <MDBTabs pills className="mb-3">
          {tabsData.map((tabData, index) => (
            <MDBTabsItem key={index}>
              <Chip
                as={MDBTabsLink}
                text={tabData.tabTitle}
                selected={basicActive === tabData.tabTitle}
                setSelected={setBasicActive}
                active={basicActive === tabData.tabTitle}
              />
            </MDBTabsItem>
          ))}
        </MDBTabs>
      </div>
      <MDBTabsContent>
        
        {tabsData.map((tabData, index) => (
          <MDBTabsPane open={basicActive === tabData.tabTitle} key={index}><h4>{tabData.carouselItems[0].title}</h4></MDBTabsPane>
        ))}
      </MDBTabsContent>
    </div>
  );
}
export default PosterGalleryComponent;

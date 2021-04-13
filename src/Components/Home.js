import { useSpring, animated } from "react-spring";
import gsap from "gsap";
import FrontPageNews from "./frontPageNews";
import BigShort from "./bigshort";
import Guitars from "./Guitars";
import YouTubeTech from "./YouTubeTech";
import ExpenseTrackerHolder from "./ExpenseTrackerHolder";
import threeDimensions from "./cubeTestComponent";
import DowIndexWidget from "./DowIndexWidget";
import NASDAQ_IndexWidget from "./NASDAQ_IndexWidget";

import React, { useState, useEffect, useRef, useContext } from "react";
import { PriceContext } from "./PriceContext";

const Home = (props) => {
  const props2 = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0, transform: "translateX(2000px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  let isDarkMode = props.darkModeProp;
  let toolsEnabled = props.toolsProp;

  return (
    <animated.div
      className="home-div"
      style={{ transform: props2.transform, opacity: props2.opacity }}
    >
      <div
        id="home-left-content"
        className={
          isDarkMode ? "Dark-Mode-leftWidget" : "Light-Mode-leftWidget"
        }
      >
        <div id="leftContentCenter">
          <FrontPageNews darkModeProp={isDarkMode} />
        </div>
      </div>

      <div
        id="home-right-content"
        className={
          isDarkMode ? "Dark-Mode-rightWidget" : "Light-Mode-rightWidget"
        }
      >
        <BigShort darkModeProp={isDarkMode} />
      </div>
    </animated.div>
  );
};

export default Home;

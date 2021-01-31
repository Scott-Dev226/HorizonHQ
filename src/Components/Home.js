import { useSpring, animated } from "react-spring";
import gsap from "gsap";
import FrontPageNews from "./frontPageNews";
import BigShort from "./bigshort";
import YouTubeTech from "./YouTubeTech";
import React, { useState, useEffect, useRef, useReducer } from "react";

const Home = (props) => {
  const props2 = useSpring({
    config: { duration: 5000 },
    from: { opacity: 0 },
    to: { opacity: 1 },
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
        {toolsEnabled && <BigShort darkModeProp={isDarkMode} />}
      </div>
    </animated.div>
  );
};

export default Home;

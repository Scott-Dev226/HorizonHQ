import React, { useState, useEffect, useRef, useReducer } from "react";
import { useSpring, animated } from "react-spring";


const YouTubeTech = (props) =>{

 let isDarkMode = props.darkModeProp;

  const props2 = useSpring({
    config: { duration: 4000 },
    from: { opacity: 0, width: "0%", height: "0%" },
    to: { opacity: 0.9, width: "100%", height: "100%" },
  });



return(

    <animated.div style={{
      
        opacity: props2.opacity,
        width: props2.width,
        height: props2.height,
      }}>

     <h1
          id="Header-Title"
          className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
        >
          Nick's Top YT Vid Picks
        </h1>
        +
      </animated.div>
)


}

export default YouTubeTech
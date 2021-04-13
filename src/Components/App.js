import Nav from "./Nav";
import Guitars from "./Guitars";
import About from "./About";
import BigShort from "./bigshort";
import weather from "./weather";
import Home from "./Home";
import FrontPageNews from "./frontPageNews";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Stars, Sky } from "@react-three/drei";
import { OrbitControls, StandardEffects, draco } from "@react-three/drei";
import threeDimensions from "./cubeTestComponent";
import DowIndexWidget from "./DowIndexWidget";
import NASDAQ_IndexWidget from "./NASDAQ_IndexWidget";
import BTC_IndexWidget from "./BTC_IndexWidget";
import GoldIndexWidget from "./GoldIndexWidget";
import TopGainers from "./TopGainers";
import { PriceContext } from "./PriceContext";
import { PriceVarianceContext } from "./PriceVarianceContext";
import Marquee from "react-fast-marquee";
import gsap from "gsap";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  let isDarkMode = props.darkModeProp;

  let rotationSpeed = 0.01;
  if (!isDarkMode) {
    rotationSpeed = 0.01;
  }

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry attach="geometry" args={[5, 3.5, 1]} />
      <meshBasicMaterial
        wireframe={true}
        metalness={1}
        attach="material"
        color={isDarkMode ? "blue" : "red"}
      />
    </mesh>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toolsEnabled, setToolsEnabled] = useState(true);
  const interimInputRef = useRef(null);
  const [displayPrice, setDisplayPrice] = useState(null);
  const [displayVariance, setDisplayVariance] = useState(null);
  const [indexGraphPeriod, setIndexGraphPeriod] = useState(60);

  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);
  const [pageThree, setPageThree] = useState(false);

  const props2 = useSpring({
    config: { duration: 2500 },
    from: { transform: "translateX(500px)" },
    to: { transform: "translateX(0px)" },
  });

  return (
    <div
      id="motherShip"
      className={isDarkMode ? "stockParentDiv-Dark" : "stockParentDiv-Light"}
    >
      <Router>
        <div className="App">
          <div id="forNavCenter">
            <Nav darkModeProp={isDarkMode} />

            <div
              id="button-holder"
              className={
                isDarkMode
                  ? "Dark-Mode-buttonHolder"
                  : "Light-Mode-buttonHolder"
              }
            >
              <button
                id="btn"
                onClick={() => {
                  if (pageOne) {
                    setPageOne(false);
                    setPageTwo(true);
                  } else if (pageTwo) {
                    setPageTwo(false);
                    setPageThree(true);
                  } else if (pageThree) {
                    setPageThree(false);
                    setPageOne(true);
                  }
                }}
              >
                {"VIEW NEXT SECTION" + ">>>"}
              </button>
            </div>

            {pageOne && (
              <div>
                <TopGainers />
              </div>
            )}

            <div id="indexVarianceSelector">
              {pageTwo && (
                <div id="buttonDiv">
                  <select
                    name="selectStock"
                    id="varianceInput"
                    ref={interimInputRef}
                  >
                    <option value="60">60 Days</option>
                    <option value="30">30 Days</option>
                    <option value="14">2 Weeks</option>
                    <option value="7">1 Week</option>
                  </select>
                  <button
                    id="btn"
                    onClick={() => {
                      gsap.to(".dowChartDisplay-Light", {
                        opacity: 0,
                      });

                      setTimeout(() => {
                        setIndexGraphPeriod(interimInputRef.current.value);
                        setToolsEnabled(false);
                      }, 750);

                      setTimeout(() => {
                        setToolsEnabled(true);
                        gsap.to(".dowChartDisplay-Light", {
                          opacity: 1,
                          duration: 0.5,
                        });
                      }, 750);
                    }}
                  >
                    CLICK TO UPDATE THE INTERIM FOR THE BELOW
                  </button>
                </div>
              )}
            </div>

            <animated.div
              id="indexChartContainer"
              style={{ transform: props2.transform }}
            >
              {pageTwo && (
                <DowIndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}

              {pageTwo && (
                <NASDAQ_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}
              {pageTwo && (
                <BTC_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}
              {pageTwo && (
                <GoldIndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}
            </animated.div>
          </div>
          <Switch>
            <PriceVarianceContext.Provider
              value={{ displayVariance, setDisplayVariance }}
            >
              <PriceContext.Provider value={{ displayPrice, setDisplayPrice }}>
                {pageThree && (
                  <Home darkModeProp={isDarkMode} toolsProp={toolsEnabled} />
                )}

                <Route path="/Home" component={Home} />
                <Route path="/Guitars" component={Guitars} />
                <Route path="/weather" component={weather} />
                <Route path="/About" component={About} />
                <Route path="/bigshort" component={BigShort} />
              </PriceContext.Provider>
            </PriceVarianceContext.Provider>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

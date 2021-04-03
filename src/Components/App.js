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
            ></div>

            <div>
              <TopGainers />
            </div>

            <div id="indexChartContainer">
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

              <div id="buttonDiv">
                <button
                  id="btn"
                  onClick={() => {
                    gsap.to(".dowChartDisplay-Light", {
                      opacity: 0,
                      duration: 0.5,
                    });

                    setTimeout(() => {
                      setIndexGraphPeriod(interimInputRef.current.value);
                      setToolsEnabled(false);
                    }, 1500);

                    setTimeout(() => {
                      setToolsEnabled(true);
                      gsap.to(".dowChartDisplay-Light", {
                        opacity: 1,
                        duration: 1.5,
                      });
                    }, 1600);
                  }}
                >
                  CLICK TO UPDATE THE INTERIM FOR THE BELOW
                </button>
              </div>
              {toolsEnabled && (
                <DowIndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}

              {toolsEnabled && (
                <NASDAQ_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}
              {toolsEnabled && (
                <BTC_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                  interimProp={indexGraphPeriod}
                />
              )}
            </div>
          </div>
          <Switch>
            <PriceVarianceContext.Provider
              value={{ displayVariance, setDisplayVariance }}
            >
              <PriceContext.Provider value={{ displayPrice, setDisplayPrice }}>
                <Route
                  exact
                  path="/HorizonHQ"
                  exact
                  render={() => (
                    <Home darkModeProp={isDarkMode} toolsProp={toolsEnabled} />
                  )}
                />
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

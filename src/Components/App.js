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

  const [displayPrice, setDisplayPrice] = useState(null);
  const [displayVariance, setDisplayVariance] = useState(null);

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
              {toolsEnabled && (
                <DowIndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                />
              )}

              {toolsEnabled && (
                <NASDAQ_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
                />
              )}
              {toolsEnabled && (
                <BTC_IndexWidget
                  darkModeProp={isDarkMode}
                  toolsProp={toolsEnabled}
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

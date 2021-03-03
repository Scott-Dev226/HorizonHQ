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
import { PriceContext } from "./PriceContext";
import { PriceVarianceContext } from "./PriceVarianceContext";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  let isDarkMode = props.darkModeProp;

  let rotationSpeed = 0.015;
  if (!isDarkMode) {
    rotationSpeed = 0.015;
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
  const [isDarkMode, setIsDarkMode] = useState(true);
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
            <div id="Cube-3D-Container">
              <Canvas>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} />
                <Box position={[-1.2, 0, 0]} darkModeProp={isDarkMode} />
                <OrbitControls />
                <Stars
                  radius={100} // Radius of the inner sphere (default=100)
                  depth={50} // Depth of area where stars should fit (default=50)
                  count={777} // Amount of stars (default=5000)
                  factor={4} // Size factor (default=4)
                  saturation={0} // Saturation 0-1 (default=0)
                  fade // Faded dots (default=false)
                />
              </Canvas>
            </div>
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
                id="Light-Button"
                onClick={() => setIsDarkMode((prevMode) => !prevMode)}
              >
                {isDarkMode
                  ? "CLICK TO ENABLE LIGHT MODE"
                  : "CLICK TO ENABLE DARK MODE"}
              </button>
            </div>

            <div id="indexChartCenter">
              <DowIndexWidget
                darkModeProp={isDarkMode}
                toolsProp={toolsEnabled}
              />

              <NASDAQ_IndexWidget
                darkModeProp={isDarkMode}
                toolsProp={toolsEnabled}
              />
              <BTC_IndexWidget
                darkModeProp={isDarkMode}
                toolsProp={toolsEnabled}
              />
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

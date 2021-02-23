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
import DowIndexWidget from "./DowIndexWidget";
import NASDAQ_IndexWidget from "./NASDAQ_IndexWidget";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toolsEnabled, setToolsEnabled] = useState(true);

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
            </div>
          </div>
          <Switch>
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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

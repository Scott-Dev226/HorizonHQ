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

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  let isDarkMode = props.darkModeProp;

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
      <meshStandardMaterial
        metalness={0.1}
        attach="material"
        color={isDarkMode ? "blue" : "red"}
      />
    </mesh>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toolsEnabled, setToolsEnabled] = useState(false);

  return (
    <div
      id="motherShip"
      className={isDarkMode ? "stockParentDiv-Dark" : "stockParentDiv-Light"}
    >
      <Router>
        <div className="App">
          <div id="forNavCenter">
            <>
              <Canvas>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} />
                <Box position={[-1.2, 0, 0]} darkModeProp={isDarkMode} />
              </Canvas>
              <h1>HORIZON HQ</h1>
            </>
            <div
              id="button-holder"
              className={
                isDarkMode
                  ? "Dark-Mode-buttonHolder"
                  : "Light-Mode-buttonHolder"
              }
            >
              <button onClick={() => setIsDarkMode((prevMode) => !prevMode)}>
                {isDarkMode
                  ? "CLICK TO DISABLE DARK MODE"
                  : "CLICK TO ENABLE DARK MODE"}
              </button>

              <button onClick={() => setToolsEnabled((prevMode) => !prevMode)}>
                {toolsEnabled
                  ? "CLICK TO CLOSE FINANCE TOOLS"
                  : "CLICK TO OPEN FINANCE TOOLS"}
              </button>
            </div>

            <Nav darkModeProp={isDarkMode} />
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

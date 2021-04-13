import React, { useState, useEffect, useRef, useContext } from "react";
import { useSpring, animated } from "react-spring";
import gsap from "gsap";
import Hendrix from "../VS_Spinner.jpg";
import Chart from "chart.js";
import labelz from "chartjs-plugin-labels";
import useApiFetch from "./api_fetch";
import arrow from "../right-arrow.png";
import { PriceContext } from "./PriceContext";
import { PriceVarianceContext } from "./PriceVarianceContext";
import { Canvas, useFrame } from "react-three-fiber";
import { Stars, Sky } from "@react-three/drei";
import { OrbitControls, StandardEffects, draco } from "@react-three/drei";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  let isDarkMode = props.darkModeProp;
  let arrowUpPosition = props.arrowProp;
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
      <coneGeometry attach="geometry" args={[2, 4, 5]} />
      <meshBasicMaterial
        wireframe={true}
        metalness={1}
        attach="material"
        color={arrowUpPosition ? "green" : "red"}
      />
    </mesh>
  );
}

const BigShort = (props) => {
  let isDarkMode = props.darkModeProp;
  let toolsEnabled = props.toolsProp;

  const { displayPrice, setDisplayPrice } = useContext(PriceContext);
  const { displayVariance, setDisplayVariance } = useContext(
    PriceVarianceContext
  );

  const {
    symbol1,
    symbol2,
    symbol3,
    stockDate,
    stockVol1,
    stockVol2,
    stockVol3,
    inputRef2,
    inputRef3,
    inputRef4,
    setToggle,
    toggle,
    stockCascadeClose,
    stockCascadeClose2,
    stockCascadeClose3,
    stockCascadeDate,
    stock1Change,
    setStock1Change,
    stock2Change,
    setStock2Change,
    stock3Change,
    setStock3Change,
    stock1TodaysClose,
    stock2TodaysClose,
    stock3TodaysClose,
    exchange,
    setExchange,
    exchangeInputRef,
  } = useApiFetch();

  const [arrowUpPosition, setArrowUpPosition] = useState(false);

  useEffect(() => {
    if (displayVariance < 0) {
      document.getElementById("variance").innerHTML = "-DOWN-";
      document.getElementById("variance").style.backgroundColor = "red";
      gsap.to(".Pyramid-Arrow", { rotation: 180 });
      setArrowUpPosition(false);
    } else if (displayVariance > 0) {
      document.getElementById("variance").innerHTML = "-UP-";
      document.getElementById("variance").style.backgroundColor = "green";
      gsap.to(".Pyramid-Arrow", { rotation: 0 });
      setArrowUpPosition(true);
    }
  }, [displayVariance]);

  const props2 = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0, transform: "translateX(2000px)" },
    to: { opacity: 0.9, transform: "translateX(0px)" },
  });

  return (
    <animated.div id="stockBackgroundDiv">
      <div
        className={isDarkMode ? "stockParentDiv-Dark" : "stockParentDiv-Light"}
      >
        <p id="faq2">
          {" "}
          For Custom Data, enter a valid Stock Symbol and Index Combination
          below (example: "GME" for the Stock Symbol, and "NYSE" for the Index):
        </p>

        <animated.div id="vs_back">
          <select name="selectStock" id="exchangeInput" ref={exchangeInputRef}>
            <option value="NASDAQ">NASDAQ</option>
            <option value="NYSE">NYSE</option>
          </select>

          <form>
            <div className="form-inner">
              <input
                type="text"
                name="desc"
                id="desc"
                placeholder="Enter Stock Symbol..."
                ref={inputRef2}
              />
            </div>
          </form>

          <div id="buttonDiv">
            <button
              id="btn"
              onClick={() => {
                setToggle(inputRef2.current.value);
                setExchange(exchangeInputRef.current.value);
                gsap.to(".chartDisplay", {
                  opacity: 1,
                  duration: 2,
                  stagger: 0.5,
                  delay: 0,
                });
                gsap.to(".stockHolder", {
                  opacity: 1,
                  delay: 1,
                });

                gsap.to(".newsOpacity", { opacity: 0.75 });
              }}
            >
              CLICK FOR LIVE DATA
            </button>
          </div>
        </animated.div>

        <p id="stockName"> </p>
        <div className="stockHolder">
          <div id="Cube-3D-Container" className="Pyramid-Arrow">
            <Canvas>
              <ambientLight intensity={1} />
              <spotLight position={[0, 0, 0]} angle={0} />
              <Box
                position={[0, 0, 0]}
                darkModeProp={isDarkMode}
                arrowProp={arrowUpPosition}
              />

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
          <p id="variance"></p>
          <p id="variance"> Current Stock Price: ${displayPrice}</p>
          <p id="variance">Variance: {displayVariance + "%"}</p>
        </div>

        <div id="chartCenterDiv">
          <div id="chartHolder2" className="chartDisplay">
            <canvas id="myChart2" width="800" height="500"></canvas>
          </div>

          <div id="chartHolder3" className="chartDisplay">
            <canvas id="myDoughChart" width="800" height="500"></canvas>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default BigShort;

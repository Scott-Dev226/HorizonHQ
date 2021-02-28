import React, { useState, useEffect, useRef, useReducer } from "react";
import { useSpring, animated } from "react-spring";
import gsap from "gsap";
import Hendrix from "../VS_Spinner.jpg";
import Chart from "chart.js";
import labelz from "chartjs-plugin-labels";
import useApiFetch from "./api_fetch";
import arrow from "../right-arrow.png";

const BigShort = (props) => {
  let isDarkMode = props.darkModeProp;
  let toolsEnabled = props.toolsProp;

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

  useEffect(() => {
    if (stock1Change < 0) {
      document.getElementById("variance").innerHTML = "-DOWN-";
      document.getElementById("variance").style.backgroundColor = "red";
      gsap.to(".arrow1", { rotation: 90 });
    } else if (stock1Change > 0) {
      document.getElementById("variance").innerHTML = "-UP-";
      document.getElementById("variance").style.backgroundColor = "green";
      gsap.to(".arrow1", { rotation: -90 });
    }
  }, [stock1Change]);

  const props2 = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0, width: "0%", height: "0%" },
    to: { opacity: 0.9, width: "100%", height: "100%" },
  });

  return (
    <animated.div
      id="stockBackgroundDiv"
      style={{
        transform: props2.transform,
        opacity: props2.opacity,
        width: props2.width,
        height: props2.height,
      }}
    >
      <div
        className={isDarkMode ? "stockParentDiv-Dark" : "stockParentDiv-Light"}
      >
        <p id="faq"> Select Three(3) Companies from the Drop-Down:</p>

        <animated.div
          id="vs_back"
          style={{ transform: props2.transform, x: props2.x }}
        >
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
                placeholder="Enter Stock 1..."
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
                  border: "1px solid white",
                  opacity: 0.5,
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

        <div id="chartCenterDiv">
          <div id="chartHolder2" className="chartDisplay">
            <canvas id="myChart2" width="800" height="500"></canvas>
          </div>

          <div id="chartHolder3" className="chartDisplay">
            <canvas id="myDoughChart" width="800" height="500"></canvas>
          </div>

          <div className="stockHolder">
            <p id="stockDate">{symbol1 + " " + stockDate}</p>
            <img
              className="arrow1"
              style={{ height: "50px" }}
              src={arrow}
              alt="arrow1"
            ></img>
            <p id="variance"></p>
            <p id="variance">Price: ${stock1TodaysClose}</p>
            <p id="stockDate">{stock1Change + "%"}</p>
          </div>
        </div>

        <div className="outerStockDiv"></div>
      </div>
    </animated.div>
  );
};

export default BigShort;

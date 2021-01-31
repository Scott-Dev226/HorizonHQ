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
  } = useApiFetch();

  useEffect(() => {
    if (stock1Change < 0) {
      document.getElementById("variance").innerHTML = "Down by";
      document.getElementById("variance").style.backgroundColor = "red";
      gsap.to(".arrow1", { rotation: 90 });
    } else if (stock1Change > 0) {
      document.getElementById("variance").innerHTML = "Up by";
      document.getElementById("variance").style.backgroundColor = "green";
      gsap.to(".arrow1", { rotation: -90 });
    }

    if (stock2Change < 0) {
      document.getElementById("variance2").innerHTML = "Down by";
      document.getElementById("variance2").style.backgroundColor = "red";
      gsap.to(".arrow2", { rotation: 90 });
    } else if (stock2Change > 0) {
      document.getElementById("variance2").innerHTML = "Up by";
      document.getElementById("variance2").style.backgroundColor = "green";
      gsap.to(".arrow2", { rotation: -90 });
    }

    if (stock3Change < 0) {
      document.getElementById("variance3").innerHTML = "Down by";
      document.getElementById("variance3").style.backgroundColor = "red";
      gsap.to(".arrow3", { rotation: 90 });
    } else if (stock3Change > 0) {
      document.getElementById("variance3").innerHTML = "Up by";
      document.getElementById("variance3").style.backgroundColor = "green";
      gsap.to(".arrow3", { rotation: -90 });
    }
  }, [stock1Change, stock2Change, stock3Change]);

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
          <select name="selectStock" id="input3" ref={inputRef2}>
            <option value="AAPL">Apple</option>
            <option value="AMZN">Amazon</option>
            <option value="CRSP">Crispr Therapeutics</option>
            <option value="FB">Facebook</option>
            <option value="GOOG">Google</option>
            <option value="INTC">Intel</option>
            <option value="MSFT">Microsoft</option>
            <option value="NFLX">Netflix</option>
            <option value="TSLA">Tesla</option>
          </select>

          <select name="selectStock2" id="input3" ref={inputRef3}>
            <option value="AAPL">Apple</option>
            <option value="AMZN">Amazon</option>
            <option value="CRSP">Crispr Therapeutics</option>
            <option value="FB">Facebook</option>
            <option value="GOOG">Google</option>
            <option value="INTC">Intel</option>
            <option value="MSFT">Microsoft</option>
            <option value="NFLX">Netflix</option>
            <option value="TSLA">Tesla</option>
          </select>

          <select name="selectStock2" id="input3" ref={inputRef4}>
            <option value="AAPL">Apple</option>
            <option value="AMZN">Amazon</option>
            <option value="CRSP">Crispr Therapeutics</option>
            <option value="FB">Facebook</option>
            <option value="GOOG">Google</option>
            <option value="INTC">Intel</option>
            <option value="MSFT">Microsoft</option>
            <option value="NFLX">Netflix</option>
            <option value="TSLA">Tesla</option>
          </select>

          <div id="buttonDiv">
            <button
              id="btn"
              onClick={() => {
                setToggle(
                  inputRef2.current.value +
                    "," +
                    inputRef3.current.value +
                    "," +
                    inputRef4.current.value
                );

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
                gsap.to(".stockHolder2", {
                  border: "1px solid white",
                  opacity: 0.5,
                  delay: 1,
                });
                gsap.to(".stockHolder3", {
                  border: "1px solid white",
                  opacity: 0.5,
                  delay: 1,
                });
                gsap.from(".dynamicBackClass", { opacity: 0, duration: 3 });
                gsap.from(".stockDataSlide", {
                  x: -1000,
                  y: 500,
                  stagger: 0.5,
                  duration: 3,
                });
                gsap.from(".stockDataSlide2", {
                  y: 1000,
                  stagger: 0.5,
                  duration: 3,
                });
                gsap.from(".stockDataSlide3", {
                  x: 1000,
                  y: 500,
                  stagger: 0.5,
                  duration: 3,
                });
                gsap.to(".newsOpacity", { opacity: 0.75 });
              }}
            >
              CLICK FOR LIVE DATA
            </button>
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
            <p id="stockDate">{stock1Change + "%"}</p>
          </div>

          <div className="stockHolder2">
            <p id="stockDate2">{symbol2 + " " + stockDate}</p>
            <img
              className="arrow2"
              style={{ height: "50px" }}
              src={arrow}
              alt="arrow2"
            ></img>
            <p id="variance2"></p>
            <p id="stockDate2">{stock2Change + "%"}</p>
          </div>

          <div className="stockHolder3">
            <p id="stockDate3">{symbol3 + " " + stockDate}</p>
            <img
              className="arrow3"
              style={{ height: "50px" }}
              src={arrow}
              alt="arrow3"
            ></img>
            <p id="variance3"></p>
            <p id="stockDate3">{stock3Change + "%"}</p>
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
        </div>

        <div className="outerStockDiv"></div>
      </div>
    </animated.div>
  );
};

export default BigShort;

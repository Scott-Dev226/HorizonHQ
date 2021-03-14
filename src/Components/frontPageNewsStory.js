import React, { useState, useEffect, useRef, useContext } from "react";
import { StreamCopyUsage } from "three";
import AppleImage from "../aapl-back.jpg";
import GoogleImage from "../goog-back.jpg";
import isDarkMode from "./Home";
import useApiFetch from "./api_fetch";
import gsap from "gsap";
import { PriceContext } from "./PriceContext";

const FrontPageNewsStory = (props) => {
  let isDarkMode = props.darkModeProp;
  const { displayPrice, setDisplayPrice } = useContext(PriceContext);

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
    exchangeInputRef,
    exchange,
    setExchange,
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

  return (
    <div
      id="news-headlines"
      className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
    >
      <div id="newsHeadlineCenterDiv">
        <h1
          id="quickNewsHeadline"
          className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
        >
          {" "}
          {props.Headline}{" "}
        </h1>
      </div>
      <img
        id="news-img"
        className={isDarkMode ? "Dark-Mode" : "Light-Mode"}
        src={props.Image}
        alt={props.Name}
        onClick={() => {
          setToggle(props.Description2);
          setExchange("NASDAQ");

          gsap.to(".chartDisplay", {
            opacity: 1,
            duration: 2,
            stagger: 0.5,
            delay: 0,
          });

          gsap.to(".stockHolder", {
            border: "1px solid white",
            opacity: 1,
            delay: 1,
          });
        }}
      ></img>
    </div>
  );
};

export default FrontPageNewsStory;

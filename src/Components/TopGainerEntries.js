import React, { useState, useEffect, useRef, useReducer } from "react";
import { useSpring, animated } from "react-spring";

const TopGainerEntries = (props) => {
  let stockSymbol = props.symbolProp;
  let Variance = props.varianceProp;
  let Price = props.priceProp;

  return (
    <div id="Top-Gainer-Entry" class="gainer-slide">
      <p id="gainer-symbol">{stockSymbol}</p>
      <p id="gainer-price">{`$${Price} `}</p>
      <p id="gainer-variance">{`+ ${Variance}%`}</p>
    </div>
  );
};

export default TopGainerEntries;

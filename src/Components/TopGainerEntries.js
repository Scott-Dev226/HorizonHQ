import React, { useState, useEffect, useRef, useReducer } from "react";
import { useSpring, animated } from "react-spring";

const TopGainerEntries = (props) => {
  let stockSymbol = props.symbolProp;
  let Variance = props.varianceProp;
  let Price = props.priceProp;

  return (
    <div id="Top-Gainer-Entry" className="gainer-slide">
      <p id="gainer-symbol" class="gainer-symbol-slide">
        {stockSymbol}
      </p>
      <p id="gainer-price" class="gainer-price-slide">{`$${Price} `}</p>
      <p
        id="gainer-variance"
        class="gainer-variance-slide"
      >{`+ ${Variance}%`}</p>
    </div>
  );
};

export default TopGainerEntries;

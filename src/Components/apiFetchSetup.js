import React, { useState, useEffect, useRef, useReducer } from "react";

const useApiFetchSetup = () => {
  const today = new Date();
  let dd = today.getDate() - 2;
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  const todaysDate = yyyy + "-" + mm + "-" + dd;

  const [newsBlock1, setNewsBlock1] = useState(null);
  const [newsBlock2, setNewsBlock2] = useState(null);
  const [newsBlock3, setNewsBlock3] = useState(null);

  const [newsBlock1URL, setNewsBlock1URL] = useState(null);
  const [newsBlock2URL, setNewsBlock2URL] = useState(null);
  const [newsBlock3URL, setNewsBlock3URL] = useState(null);

  const [symbol1, setSymbol1] = useState(null);
  const [symbol2, setSymbol2] = useState(null);
  const [symbol3, setSymbol3] = useState(null);

  const [stockDate, setStockDate] = useState(null);
  const [stockDate2, setStockDate2] = useState(null);
  const [stockDate3, setStockDate3] = useState(null);

  const [stock1Change, setStock1Change] = useState(null);
  const [stock2Change, setStock2Change] = useState(null);
  const [stock3Change, setStock3Change] = useState(null);

  const [upArrow, setUpArrow] = useState(null);

  const [data, setData] = useState(null);
  const [stockVol1, setStockVol1] = useState(null);
  const [stockVol2, setStockVol2] = useState(null);
  const [stockVol3, setStockVol3] = useState(null);

  const [stockCascadeDate, setStockCascadeDate] = useState(null);
  const [stockCascadeClose, setStockCascadeClose] = useState(null);
  const [stockCascadeClose2, setStockCascadeClose2] = useState(null);
  const [stockCascadeClose3, setStockCascadeClose3] = useState(null);

  var inputRef2 = useRef();
  var inputRef3 = useRef();
  var inputRef4 = useRef();
  let [toggle, setToggle] = useState(inputRef2);

  return {
    todaysDate,
    inputRef2,
    inputRef3,
    inputRef4,
    toggle,
    setToggle,
    newsBlock1,
    setNewsBlock1,
    newsBlock2,
    setNewsBlock2,
    newsBlock3,
    setNewsBlock3,
    newsBlock1URL,
    setNewsBlock1URL,
    newsBlock2URL,
    setNewsBlock2URL,
    newsBlock3URL,
    setNewsBlock3URL,
    symbol1,
    setSymbol1,
    symbol2,
    setSymbol2,
    symbol3,
    setSymbol3,
    stockDate,
    setStockDate,
    stockDate2,
    setStockDate2,
    stockDate3,
    setStockDate3,
    data,
    setData,
    stockVol1,
    setStockVol1,
    stockVol2,
    setStockVol2,
    stockVol3,
    setStockVol3,
    stockCascadeDate,
    setStockCascadeDate,
    stockCascadeClose,
    setStockCascadeClose,
    stockCascadeClose2,
    setStockCascadeClose2,
    stockCascadeClose3,
    setStockCascadeClose3,
    stock1Change,
    setStock1Change,
    stock2Change,
    setStock2Change,
    stock3Change,
    setStock3Change,
    upArrow,
    setUpArrow,
  };
};

export default useApiFetchSetup;

import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import TopGainerEntries from "./TopGainerEntries";
import Marquee from "react-fast-marquee";

const TopGainers = () => {
  /*
  window.setTimeout(() => {
    symbolReplacer();
  }, 15000);

 
  const symbolReplacer = () => {
    if (gainerListCount = 0){
    Nasdaq100_List_1 = [GOOGL,HAS,HSIC,ILMN,INCY,INTC,INTU,ISRG,IDXX,JBHT,JD,KLAC,KHC,LRCX,LBTYA,LBTYK,LULU,MELI,MAR,MCHP];
    setGainerListCount(gainerListCount++);
  };
  */

  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  const todaysGainerDate = mm + "/" + dd + "/" + yyyy;

  const [gainerSymbolDisplay, setGainerSymbolDisplay] = useState([]);
  const [gainerVarianceDisplay, setGainerVarianceDisplay] = useState([]);
  const [gainerPriceDisplay, setGainerPriceDisplay] = useState([]);
  const [gainerObjects, setGainerObjects] = useState([]);
  const [targetVariance, setTargetVariance] = useState(2);
  const varianceInputRef = useRef(null);

  const [gainerListCount, setGainerListCount] = useState(0);

  let g = 0;

  let Nasdaq100_List_1 = [
    "ATVI",
    "ADBE",
    "AMD",
    "ALGN",
    "ALXN",
    "AMZN",
    "AMGN",
    "AAL",
    "ADI",
    "AAPL",
    "AMAT",
    "ASML",
    "ADSK",
    "ADP",
    "AVGO",
    "BIDU",
    "BIIB",
    "BMRN",
    "CDNS",
    "CERN",
    "CHKP",
    "CHTR",
    "TCOM",
    "CTAS",
    "CSCO",
    "CTXS",
    "CMCSA",
    "COST",
    "CSX",
    "CTSH",
    "DLTR",
    "EA",
    "EBAY",
    "EXC",
    "EXPE",
    "FAST",
    "FB",
    "FISV",
    "GILD",
    "GOOG",
    "GOOGL",
    "HAS",
    "HSIC",
    "ILMN",
    "INCY",
    "INTC",
    "INTU",
    "ISRG",
    "IDXX",
    "JBHT",
    "JD",
    "KLAC",
    "KHC",
    "LRCX",
    "LBTYA",
    "LBTYK",
    "LULU",
    "MELI",
    "MAR",
    "MCHP",
    "MDLZ",
    "MNST",
    "MSFT",
    "MU",
    "MXIM",
    "MYL",
    "NTAP",
    "NFLX",
    "NTES",
    "NVDA",
    "NXPI",
    "ORLY",
    "PAYX",
    "PCAR",
    "BKNG",
    "PYPL",
    "PEP",
    "QCOM",
    "REGN",
    "ROST",
    "SIRI",
    "SWKS",
    "SBUX",
    "NLOK",
    "SNPS",
    "TWO",
    "TSLA",
    "TXN",
    "TMUS",
    "ULTA",
    "UAL",
    "VRSN",
    "VRSK",
    "VRTX",
    "WBA",
    "WDC",
    "WDAY",
    "WYNN",
    "XEL",
    "XLNX",
  ];

  const gainerURL = `https://api.twelvedata.com/quote?symbol=${Nasdaq100_List_1}&apikey=f12c3d6e34d241178fae0bd392e18b07`;

  const topGainersFunction = (gainerSymbolDisplay, gainerVarianceDisplay) => {};

  useEffect(() => {
    fetch(gainerURL)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        for (let i = 0; i < Nasdaq100_List_1.length; i++) {
          if (data[Nasdaq100_List_1[i]].percent_change > targetVariance) {
            setGainerSymbolDisplay((oldArray) => [
              ...oldArray,
              data[Nasdaq100_List_1[i]].symbol,
            ]);
            setGainerPriceDisplay((oldArray) => [
              ...oldArray,
              data[Nasdaq100_List_1[i]].close,
            ]);
            setGainerVarianceDisplay((oldArray) => [
              ...oldArray,
              data[Nasdaq100_List_1[i]].percent_change,
            ]);
          }
        }
        let testObjects = gainerSymbolDisplay.map((symbol, index) => {
          return {
            Symbol: symbol,
            Variance: gainerVarianceDisplay[index],
            Price: gainerPriceDisplay[index],
          };
        });
        setGainerObjects(testObjects);
      });
    gsap.to(".gainer-container-fade", {
      opacity: 0,
    });

    gsap.to(".gainer-container-fade", {
      opacity: 1,
      duration: 2,
      delay: 2,
    });
  }, [gainerListCount]);

  setTimeout(() => {
    setGainerListCount(g + 1);

    /*
    gsap.to(".gainer-slide", { opacity: 1, x: -10000, duration: 1000 });*/
  }, 2000);

  return (
    <div id="Marquee-Center-Container">
      <p id="Top-Gainers-Header">{`Top Gaining NASDAQ 100 Stocks for ${todaysGainerDate}`}</p>
      <select name="selectStock" id="varianceInput" ref={varianceInputRef}>
        <option value="2">2%</option>
        <option value="3">3%</option>
        <option value="4">4%</option>
        <option value="5">5%</option>
        <option value="6">6%</option>
        <option value="7">7%</option>
        <option value="8">8%</option>
        <option value="9">9%</option>
      </select>

      <div id="buttonDiv">
        <button
          id="btn"
          onClick={() => {
            setGainerObjects([]);
            setGainerSymbolDisplay([]);
            setGainerPriceDisplay([]);
            setGainerVarianceDisplay([]);
            setTargetVariance(varianceInputRef.current.value);
            setGainerListCount(g++);
          }}
        >
          CLICK TO UPDATE TARGET PERCENTAGE
        </button>
      </div>

      <p id="gainer-results">{`Current Results: ${gainerObjects.length}`} </p>
      <div id="Top-Gainers-Container" class="gainer-container-fade">
        <p id="Top-Gainers-Header2">Current Target for Gains:</p>
        <p id="Top-Gainers-Header3">{targetVariance}%</p>
        {gainerObjects.map((entry) => (
          <TopGainerEntries
            symbolProp={entry.Symbol}
            varianceProp={entry.Variance}
            priceProp={entry.Price}
          />
        ))}
      </div>
    </div>
  );
};

export default TopGainers;

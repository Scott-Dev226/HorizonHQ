import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";

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

  const [gainerSymbolDisplay, setGainerSymbolDisplay] = useState([]);
  const [gainerVarianceDisplay, setGainerVarianceDisplay] = useState([]);

  const [gainerListCount, setGainerListCount] = useState(0);

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
  ];

  const Nasdaq100_List_2 = [
    "CHKP,CHTR,TCOM,CTAS,CSCO,CTXS,CMCSA,COST,CSX,CTSH,DLTR,EA,EBAY,EXC,EXPE,FAST,FB,FISV,GILD,GOOG",
  ];

  const Nasdaq100_List_3 = [
    "GOOGL,HAS,HSIC,ILMN,INCY,INTC,INTU,ISRG,IDXX,JBHT,JD,KLAC,KHC,LRCX,LBTYA,LBTYK,LULU,MELI,MAR,MCHP",
  ];

  const gainerURL = `https://api.twelvedata.com/quote?symbol=${Nasdaq100_List_1}&apikey=8b61eafe6b2c4308aa8ebaa6799b4e59`;

  const topGainersFunction = (gainerSymbolDisplay, gainerVarianceDisplay) => {
    fetch(gainerURL)
      .then(function (resp) {
        return resp.json();
      }) // Convert data to json
      .then(function (data) {
        for (let i = 0; i < Nasdaq100_List_1.length; i++) {
          if (data[Nasdaq100_List_1[i]].percent_change > 0) {
            setGainerSymbolDisplay((oldArray) => [
              ...oldArray,
              data[Nasdaq100_List_1[i]].symbol,
            ]);
            setGainerVarianceDisplay((oldArray) => [
              ...oldArray,
              data[Nasdaq100_List_1[i]].percent_change,
            ]);
          }
        }
      });
  };

  useEffect(() => {
    topGainersFunction();
    gsap.from(".gainer-container-fade", { opacity: 0, duration: 7 });
    gsap.from(".gainer-slide", {
      x: 1500,
      stagger: 0.5,
      delay: 1.25,
      duration: 2,
      opacity: 0,
    });
  }, [gainerListCount]);

  return (
    <div id="Top-Gainers-Container" class="gainer-container-fade">
      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[0]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[0]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[1]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[1]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[2]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[2]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[3]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[3]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[4]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[4]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[5]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[5]}%`}</p>
      </div>

      <div id="Top-Gainer-Entry" class="gainer-slide">
        <p id="gainer-symbol">{gainerSymbolDisplay[6]}</p>
        <p id="gainer-variance">{`+ ${gainerVarianceDisplay[6]}%`}</p>
      </div>
    </div>
  );
};

export default TopGainers;

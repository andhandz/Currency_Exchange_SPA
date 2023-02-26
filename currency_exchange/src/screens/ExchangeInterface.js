import React, { useEffect, useState } from "react";
import "./ExchangeInterface.css";
import ukImage from "../assets/uk.png";
import polandImage from "../assets/poland.webp";
import { fetchExchangeRate } from "../config/DataProvider";

export const ExchangeInterface = () => {
  const [GBPValue, setGBPValue] = useState(0);
  const [zlotyValue, setZlotyValue] = useState(0);
  const [rate, setRate] = useState(0);

  const handleGBPChange = (event) => {
    if (event.target.value !== undefined) {
      setGBPValue(event.target.value);
      setZlotyValue((event.target.value * rate.toFixed(2)).toFixed(2));
    }
  };

  const handleZlotyChange = (event) => {
    if (event.target.value !== undefined) {
      setZlotyValue(event.target.value);
      setGBPValue((event.target.value / rate.toFixed(2)).toFixed(2));
    }
  };

  useEffect(() => {
    const fetchRate = async () => {
      const exchangeRate = await fetchExchangeRate();
      setRate(exchangeRate);
    };
    fetchRate();
  }, []);

  return (
    <>
      <div className="form-group">
        <label>
          You send
          <br />
          <img src={ukImage} alt="UK flag" className="flag-icon" id="uk" />
          <input
            type="text"
            value={GBPValue}
            onChange={handleGBPChange}
            id="gbp"
          />
          <span id="first">GBP</span>
        </label>
        <br />
        <label>
          They receive
          <img
            src={polandImage}
            alt="Poland flag"
            className="flag-icon"
            id="pl"
          />
          <input
            type="text"
            value={zlotyValue}
            onChange={handleZlotyChange}
            id="pln"
          />
          <span id="second">PLN</span>
        </label>
      </div>
      <div className="info">
        <text>1 GBP = {rate.toFixed(2)} PLN</text>
        <br />
        <h3>No transfer fee</h3>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import ukImage from "../assets/uk.png";
import polandImage from "../assets/poland.webp";
import { fetchExchangeRate } from "../config/DataProvider";
import information from "../assets/information.json";
import { Info, FormGroup } from "./styles/ExchangeInterface.styled";

export const ExchangeInterface = () => {
  const texts = information.texts;
  const [GBPValue, setGBPValue] = useState(0);
  const [PLNValue, setPLNValue] = useState(0);
  const [rate, setRate] = useState(0);
  const [sendText, setSendText] = useState(texts.send);
  const [receiveText, setReceiveText] = useState(texts.receive);
  const [activeInput, setActiveInput] = useState("GBP");

  const handleGBPChange = (event) => {
    if (event.target.value !== undefined) {
      setGBPValue(event.target.value);
      setPLNValue((event.target.value * rate.toFixed(2)).toFixed(2));
      setActiveInput("GBP");
    }
  };

  const handlePLNChange = (event) => {
    if (event.target.value !== undefined) {
      setPLNValue(event.target.value);
      setGBPValue((event.target.value / rate.toFixed(2)).toFixed(2));
      setActiveInput("PLN");
    }
  };

  useEffect(() => {
    const fetchRate = async () => {
      const exchangeRate = await fetchExchangeRate();
      setRate(exchangeRate);
    };
    fetchRate();
  }, []);

  useEffect(() => {
    if (activeInput === "GBP") {
      setSendText(texts.send);
      setReceiveText(texts.receive);
    } else {
      setSendText(texts.receive);
      setReceiveText(texts.send);
    }
  });

  return (
    <>
      <FormGroup>
        <div className="form-group">
          <label>
            {sendText}
            <br />
            <img src={ukImage} alt="UK flag" className="flag-icon" id="uk" />
            <input
              type="text"
              value={GBPValue}
              onChange={handleGBPChange}
              id="gbp"
            />
            <span id="first">{texts.gbp}</span>
          </label>
          <br />
          <label>
            {receiveText}
            <img
              src={polandImage}
              alt="Poland flag"
              className="flag-icon"
              id="pl"
            />
            <input
              type="text"
              value={PLNValue}
              onChange={handlePLNChange}
              id="pln"
            />
            <span id="second">{texts.pln}</span>
          </label>
        </div>
      </FormGroup>
      <Info>
        <div className="info">
          <text>
            {texts.equal} {rate.toFixed(2)} {texts.pln}
          </text>
          <br />
          <h3>{texts.fee}</h3>
        </div>
      </Info>
    </>
  );
};

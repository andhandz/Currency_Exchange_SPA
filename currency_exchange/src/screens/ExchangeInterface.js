import React, { useEffect, useState } from "react";
import "./ExchangeInterface.css";
import ukImage from "../assets/uk.png";
import polandImage from "../assets/poland.webp";
import { fetchExchangeRate } from "../config/DataProvider";
import { useTranslation } from 'react-i18next';


export const ExchangeInterface = () => {
  const { t } = useTranslation();
  const [GBPValue, setGBPValue] = useState(0);
  const [PLNValue, setPLNValue] = useState(0);
  const [rate, setRate] = useState(0);

  const handleGBPChange = (event) => {
    if (event.target.value !== undefined) {
      setGBPValue(event.target.value);
      setPLNValue((event.target.value * rate.toFixed(2)).toFixed(2));
    }
  };

  const handlePLNChange = (event) => {
    if (event.target.value !== undefined) {
      setPLNValue(event.target.value);
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
          {t('texts.send')}
          <br />
          <img src={ukImage} alt="UK flag" className="flag-icon" id="uk" />
          <input
            type="text"
            value={GBPValue}
            onChange={handleGBPChange}
            id="gbp"
          />
          <span id="first">{t('texts.gbp')}</span>
        </label>
        <br />
        <label>
        {t('texts.receive')}
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
          <span id="second">{t('texts.pln')}</span>
        </label>
      </div>
      <div className="info">
        <text>{t('texts.equal')} {rate.toFixed(2)} {t('texts.pln')}</text>
        <br />
        <h3>{t('texts.fee')}</h3>
      </div>
    </>
  );
};

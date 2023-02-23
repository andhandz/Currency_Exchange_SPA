import React, {useState } from "react";
import './App.css';

function App() {
  const [GBPValue, setGBPValue] = useState(0);
  const [rate, setRate] = useState(0);
  const url = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRate(data.rates[0].mid);
    }
    catch (error){
      console.log(error);
    }
  };

  const handleGBPChange = (event) => {
    setGBPValue(event.target.value);
  };

  fetchData();
  const zlotyValue=(GBPValue*rate.toFixed(2)).toFixed(2);

  return (
    <><div className="form-group">
      <label>
        You send
        <br />
        <img src="https://www.flagcolorcodes.com/data/Flag-of-United-Kingdom.png" alt="UK flag" className="flag-icon" id="uk" />
        <input type="text" value={GBPValue} onChange={handleGBPChange} />
        <span id="first">
          GBP
        </span>
      </label>
      <br />
      <label>
        They receive
        <img src="https://www.flagcolorcodes.com/images/webp/poland.webp" alt="Poland flag" className="flag-icon" id="pl" />
        <input type="text" value={zlotyValue} readOnly />
        <span id="second">
          PLN
        </span>
      </label>
    </div><div className="info">
        <text>1 GBP = {rate.toFixed(2)} PLN</text>
        <br />
        <h3>No transfer fee</h3>
      </div></>
  );
}

export default App;

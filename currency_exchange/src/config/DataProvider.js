const URL = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json";

export const fetchExchangeRate = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.rates[0].mid;
  } catch (error) {
    console.log(error);
  }
};

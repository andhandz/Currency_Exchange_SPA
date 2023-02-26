import { waitFor } from "@testing-library/react";
import React from "react";
import { createRoot } from "react-dom/client";
import renderer from "react-test-renderer";
import App from "../App";

describe("App", () => {
  const url = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json";
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      rate = data.rates[0].mid;
    } catch (error) {
      console.log(error);
    }
  };
  let rate = 0;
  fetchData();

  it("renders without crashing", () => {
    const div = document.createElement("div");
    createRoot(div).render(<App />);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("check if GBPValue input working", async () => {
    const component = renderer.create(<App />);
    const GBPInput = component.root.findByProps({ id: "gbp" });
    GBPInput.props.onChange({ target: { value: 100.0 } });
    await waitFor(() => {
      expect(GBPInput.props.value).toBe(100.0);
    });
  });

  it("check if PLNValue input working", async () => {
    const component = renderer.create(<App />);
    const PLNInput = component.root.findByProps({ id: "pln" });
    PLNInput.props.onChange({ target: { value: 100.0 } });
    await waitFor(() => {
      expect(PLNInput.props.value).toBe(100.0);
    });
  });

  it("updates GBPValue when ZlotyValue changes", async () => {
    let expectedValue = (100.0 / rate.toFixed(2)).toFixed(2).toString();
    const component = renderer.create(<App />);
    const PLNInput = component.root.findByProps({ id: "pln" });
    PLNInput.props.onChange({ target: { value: 100.0 } });
    await waitFor(() => {
      const GBPInput = component.root.findByProps({ id: "gbp" });
      expect(GBPInput.props.value).toBe(expectedValue);
    });
  });

  it("updates ZlotyValue when GBPValue changes", async () => {
    let expectedValue = (10.0 * rate.toFixed(2)).toFixed(2).toString();
    const component = renderer.create(<App />);
    const GBPInput = component.root.findByProps({ id: "gbp" });
    GBPInput.props.onChange({ target: { value: 10.0 } });
    await waitFor(() => {
      const PLNInput = component.root.findByProps({ id: "pln" });
      expect(PLNInput.props.value).toBe(expectedValue);
    });
  });
});

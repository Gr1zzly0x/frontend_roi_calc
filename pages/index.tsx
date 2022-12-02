import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from "react";
import axios from "axios";

interface IFormValues {
  initialBalance: number;
  houseEdge: number;
  wagerRequirementMultiplier: number;
  simulations: number;
}

const initialFormValues: IFormValues = {
  initialBalance: 100,
  houseEdge: 0.01,
  wagerRequirementMultiplier: 1.5,
  simulations: 100000
};

const App = () => {
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [roi, setRoi] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get("http://localhost:3000/simulateBets", { params: formValues })
      .then(response => setRoi(response.data.roi))
      .catch(error => console.error(error));
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6">Simulate bets</h1>

        <label htmlFor="initialBalance" className="block font-bold mb-2">
          Initial balance:
        </label>
        <input
          className="border rounded p-2 w-full"
          type="number"
          name="initialBalance"
          value={formValues.initialBalance}
          onChange={handleChange}
        />

        <label htmlFor="houseEdge" className="block font-bold mt-4 mb-2">
          House edge:



        <input
          className="border rounded p-2 w-full"
          type="number"
          name="houseEdge"
          value={formValues.houseEdge}
          onChange={handleChange}
        />
        </label>

        <label htmlFor="wagerRequirementMultiplier" className="block font-bold mt-4 mb-2">
          Wager requirement multiplier:
        </label>
        <input
          className="border rounded p-2 w-full"
          type="number"
          name="wagerRequirementMultiplier"
          value={formValues.wagerRequirementMultiplier}
          onChange={handleChange}
        />

        <label htmlFor="simulations" className="block font-bold mt-4 mb-2">
          Simulations:
        </label>
        <input
          className="border rounded p-2 w-full"
          type="number"
          name="simulations"
          value={formValues.simulations}
          onChange={handleChange}
        />

        <button type="submit" className="bg-blue-500 rounded-full py-2 px-4 mt-6 text-white hover:bg-blue-700">
          Simulate bets
        </button>

        <p className="mt-4 font-bold">Expected ROI: {roi}</p>
      </form>
    </div>
  );
};

export default App;

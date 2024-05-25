// src/App.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./contract";
import './App.css';

function App() {
  const [crypto, setCrypto] = useState(null);
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      setProvider(provider);
      setContract(contract);

      const address = await signer.getAddress();
      setAddress(address);
    };

    if (window.ethereum) {
      init();
    }
  }, []);

  const fetchCrypto = async () => {
    if (contract) {
      try {
        const crypto = await contract.getRandomCrypto(address);
        setCrypto(crypto);
      } catch (error) {
        console.error("Error fetching crypto:", error);
      }
    }
  };

  const handleButtonClick = async () => {
    // Проверка условий рекаста и лайка
    // Здесь нужно добавить проверку на рекаст и лайк
    await fetchCrypto();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>На какую криптовалюту ты похож?</h1>
        <button onClick={handleButtonClick}>Узнать</button>
        {crypto && (
          <div>
            <p>Ты похож на: {crypto}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

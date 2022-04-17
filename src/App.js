import { useEffect } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  useEffect(() => {
    const loadProvider = async () => {
      //with metamas we hava an access to window.ethereum & to window.web3
      // metamask injecxts a global API into website
      // this API allows websites to request user, ,account, read data to blockchain,
      // sign messages and transactions

      console.log(window.web3);
      console.log(window.ethereum);
    };
    loadProvider();
  }, []);
  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button
            onClick={async () => {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts);
            }}
            className="btn mr-2"
          >
            Enable Ethereum
          </button>
          <button className="btn mr-2 ">Donate</button>
          <button className="btn">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;

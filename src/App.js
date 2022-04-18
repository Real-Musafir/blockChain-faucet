import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      let provider = await detectEthereumProvider();

      const contract = await loadContract("Faucet");

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install metamask!!");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAcount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAcount();
  }, [web3Api.web3]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <strong className="mr-2">
              <strong>Account:</strong>
            </strong>

            {account ? (
              <span> {account}</span>
            ) : (
              <button
                onClick={() =>
                  web3Api.provider.request({ method: "eth_requestAccounts" })
                }
                className="button  is-small mr-2"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="balance-view is-size-2 my-5">
            Current Balance: <strong>10</strong> ETH
          </div>

          <button className="button  is-link mr-2 ">Donate</button>
          <button className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;

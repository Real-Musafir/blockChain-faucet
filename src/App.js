import { useCallback, useEffect, useState } from "react";
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

  const [ballance, setBallance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  const reloadEffect = useCallback(() => {
    reload(!shouldReload);
  }, [shouldReload]);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    const loadProvider = async () => {
      let provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);
        setAccountListener(provider);
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
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBallance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAcount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAcount();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    // window.location.reload();
    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmmount, { from: account });
    reloadEffect();
  };

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
            ) : !web3Api.provider ? (
              <>
                <div className="notification is-warning is-small is-rounded">
                  Wallet is not detected! {` `}
                  <a traget="_blank" href="https://docs.metamask.io">
                    Install Metamask
                  </a>
                </div>
              </>
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
            Current Balance: <strong>{ballance}</strong> ETH
          </div>

          <button
            disabled={!account}
            onClick={addFunds}
            className="button  is-link mr-2 "
          >
            Donate 1eth
          </button>
          <button
            disabled={!account}
            onClick={withdraw}
            className="button is-primary"
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

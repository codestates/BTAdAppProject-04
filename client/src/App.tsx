import React, { useContext } from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useMoralis, useChain, useOneInchTokens } from "react-moralis";
import { TokenList } from "./types";
import ChainContext from "./context/chain-context";
import SwapResultModal from "./components/SwapForm/SwapResultModal";
import { useLocation } from "react-router-dom";
import Transactions from "./pages/Transactions";
import useWindowWidth from "./hooks/useWindowWidth";
import NavTabSwitcher from "./components/NavBar/NavTabSwitcher";
import Web3 from 'web3';
declare let window: any;

function App(): JSX.Element {
  const chainCtx = useContext(ChainContext);
  const { isLight } = React.useContext(ThemeContext);
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const { isAuthenticated, isInitialized, initialize } = useMoralis();
  const { switchNetwork } = useChain();
  const { getSupportedTokens, data } = useOneInchTokens({ chain: chainCtx.chain });
  const [tokenList, setTokenList] = React.useState<TokenList | []>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [showTransactionModal, setShowTransactionModal] = React.useState(false);
  const [txHash, setTxHash] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [madeTx, setMadeTx] = React.useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  const closeModal = () => {
    setShowTransactionModal(false);
    setTxHash("");
    setErrorMessage("");
  };

  const [web3, setWeb3] = React.useState();
    const [account, setAccount] = React.useState('');

    React.useEffect(() => {
      if (typeof window.ethereum !== 'undefined') {
        // window.ethereum이 있다면
        try {
          const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
          console.log(web);
          //alert(web);
          //setWeb3(web);
        } catch (err) {
          console.log(err);
        }
      }
    }, []);

  React.useEffect(() => {
    const updateNetwork = async () => {
      if (isAuthenticated) {
        if (chainCtx.chain === "eth") await switchNetwork("0x1");
        //if (chainCtx.chain === "bsc") await switchNetwork("0x38");
        //if (chainCtx.chain === "polygon") await switchNetwork("0x89");
      }
    };
    if (isInitialized) {
      updateNetwork();
    }
  }, [chainCtx.chain, isAuthenticated, switchNetwork, isInitialized]);

  // Retrieve tokens on initial render and chain switch
  React.useEffect(() => {
    const getTokens = async () => {
      initialize();
      await getSupportedTokens();
    };

    if (data.length === 0) {
      getTokens();
    } else {
      const formattedData = JSON.parse(JSON.stringify(data!, null, 2));
      setTokenList(Object.values(formattedData.tokens));
    }
  }, [data, getSupportedTokens, initialize]);

  return (
    <div className={isLight ? styles.containerLight : styles.containerDark}>
      {showTransactionModal && (
        <SwapResultModal
          closeModal={closeModal}
          txHash={txHash}
          errorMessage={errorMessage}
        />
      )}
      <NavBar loginModalOpen={isLoginModalOpen} setLoginModalOpen={setIsLoginModalOpen} />
      {pathName === "/" && (
        <Swap
          tokenList={tokenList}
          setLoginModalOpen={setIsLoginModalOpen}
          openTransactionModal={setShowTransactionModal}
          getTxHash={setTxHash}
          getErrorMessage={setErrorMessage}
          setMadeTx={setMadeTx}
        />
      )}

      {pathName === "/transactions" && (
        <Transactions
          setLoginModalOpen={setIsLoginModalOpen}
          madeTx={madeTx}
          setMadeTx={setMadeTx}
        />
      )}
      {!isDesktop && (
        <div className="absolute bottom-0 w-screen h-20 bg-transparent p-3 mb-6">
          <NavTabSwitcher />
        </div>
      )}
    </div>
  );
}

export default App;

const styles = {
  containerLight:
    "w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative",
  containerDark:
    "w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800",
};

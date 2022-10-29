import React, {useContext, useEffect} from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useMoralis, useChain, useOneInchTokens } from "react-moralis";
import { TokenList } from "./types";
import {ethers} from "ethers";
import ChainContext from "./context/chain-context";
import SwapResultModal from "./components/SwapForm/SwapResultModal";
import { useLocation } from "react-router-dom";
import Transactions from "./pages/Transactions";
import useWindowWidth from "./hooks/useWindowWidth";
import NavTabSwitcher from "./components/NavBar/NavTabSwitcher";
import {utils} from "./components/ethersTest/utils"
import Web3 from 'web3';
import Pool from "./pages/Pool";
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
  const [isLogin, setIsLogin] = React.useState(false);


  const closeModal = () => {
    setShowTransactionModal(false);
    setTxHash("");
    setErrorMessage("");
  };


  const [web3, setWeb3] = React.useState(Object);
  const [account, setAccount] = React.useState('');


  React.useEffect(() => {
    getAccount(); // 계정 설정
  }, []);

  const getAccount = async () => {

    if (typeof(window.ethereum) == "undefined") {
        setAccount((""));
    } else {
        const web3 = new Web3(window.ethereum);
        await web3
            .eth
            .getAccounts((error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    if (result[0] !== undefined) {
                        setAccount(result[0]);
                        setWeb3(web3);

                    }
                }
            });
      }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    // console.log(ethers.utils.formatEther(await signer.getBalance()))
    console.log(await utils.getCMTBalance(signer));
    console.log(await utils.getETHBalance(signer))
    };

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
      <NavBar isLogin={isLogin} setIsLogin={setIsLogin} loginModalOpen={isLoginModalOpen} setLoginModalOpen={setIsLoginModalOpen} />
      {pathName === "/" && (
        <Swap
          tokenList={tokenList}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
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

      {pathName === "/pool" && (
          <Pool
              setLoginModalOpen={setIsLoginModalOpen}
          />
      )}

      {/*화면사이즈 줄어들 때 스왑/트랜잭션 버튼 생성*/}
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

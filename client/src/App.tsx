import React from "react";
import { useState, useContext, useEffect } from 'react';
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
import {utils} from "./components/utils/utils"
import { ethers } from 'ethers';
// import { getWethContract, getUniContract, getPrice, runSwap } from './AlphaRouterService';

declare let window: any;

function App(): JSX.Element {
  const chainCtx = useContext(ChainContext);
  const { isLight } = useContext(ThemeContext);
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const { switchNetwork } = useChain();
  const { getSupportedTokens, data } = useOneInchTokens({ chain: chainCtx.chain });
  const [tokenList, setTokenList] = useState<TokenList | []>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [madeTx, setMadeTx] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;
  const [isLogin, setIsLogin] = useState(false);

  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [signerAddress, setSignerAddress] = useState("");
  const [inputAmount, setInputAmount] = useState<number | undefined | string>();
  const [outputAmount, setOutputAmount] = useState<number | undefined | string>();
  const [ratio, setRatio] = useState<number | undefined | string>();
  const [firstBalance, setFirstBalance] = useState<number | undefined | string>();
  const [secondBalance, setSecondBalance] = useState<number | undefined | string>();
  //const [wethContract, setWethContract] = useState<any>();
  //const [uniContract, setUniContract] = useState<any>();
  
  useEffect(() => {
    onLoad();
  }, [])
  
  const onLoad = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);

    // console.log(await utils.getCMTBalance(signer)); // 토큰 확인 테스트
    // console.log(await utils.getETHBalance(signer)); // 이더 확인 테스트
    console.log(await utils.getPrice(0.1, 2, Math.floor(Date.now() / 1000 + 10 * 60), await signer.getAddress()));

    //const wethContract = getWethContract();            
    //setWethContract(wethContract);
    //const uniContract = getUniContract();
    //setUniContract(uniContract);
  }
  
  const closeModal = () => {
    setShowTransactionModal(false);
    setTxHash("");
    setErrorMessage("");
  };

  /* React.useEffect(() => {
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
  }, [data, getSupportedTokens, initialize]); */

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
      {/*화면사이즈 줄어들 때 스왑/트랜잭션 버튼 생성*/}
      {/*{!isDesktop && (*/}
      {/*  <div className="absolute bottom-0 w-screen h-20 bg-transparent p-3 mb-6">*/}
      {/*    <NavTabSwitcher />*/}
      {/*  </div>*/}
      {/*)}*/}
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

import React from "react";
import {useState, useContext, useEffect} from 'react';
import SwapFormHeader from "./SwapFormHeader";
import SwapFormInput from "./SwapFormInput";
import SwapButton from "./SwapButton";
import ThemeContext from "../../context/theme-context";
import type {TokenList} from "../../types";
import type {SelectedToken} from "../../types";
import ChainContext from "../../context/chain-context";
import Moralis from "moralis";
import {useTranslation} from "react-i18next";
import SwitchContext from "../../context/switch-context";
import SwitchButton from "./SwitchButton";
import {ethers} from 'ethers';
import {utils} from '../utils/utils'
import {Circles} from "react-loader-spinner";
import cmt from "../../assets/images/cmt.png";
import weth from "../../assets/images/weth.png";

declare let window: any;

type SwapFormProps = {
    tokenList: TokenList;
    isLogin: boolean;
    setIsLogin(val: boolean): void;
    setLoginModalOpen(val: boolean): void;
    openTransactionModal(val: boolean): void;
    getTxHash(hash: string): void;
    getErrorMessage(message: string): void;
    setMadeTx(val: boolean): void;
};

type data = {
    tokenList: TokenList;
    isLogin: boolean;
    setIsLogin(val: boolean): void;
    setLoginModalOpen(val: boolean): void;
    openTransactionModal(val: boolean): void;
    getTxHash(hash: string): void;
    getErrorMessage(message: string): void;
    setMadeTx(val: boolean): void;
};

const SwapForm = ({
                      tokenList,
                      isLogin,
                      setIsLogin,
                      setLoginModalOpen,
                      openTransactionModal,
                      getTxHash,
                      getErrorMessage,
                      setMadeTx,
                  }: SwapFormProps): JSX.Element => {
    const {isLight} = useContext(ThemeContext);
    const {chain} = useContext(ChainContext);
    const {isSwitch} = useContext(SwitchContext);
    const {t} = useTranslation();
    const [firstToken, setFirstToken] = useState<SelectedToken>({name:"Wrapped Ether",logo:weth,address:"",decimals: 0,symbol:"WETH"});
    const [secondToken, setSecondToken] = useState<SelectedToken>({name:"CodeMonkey Token",logo:cmt,address:"",decimals: 0,symbol:"CMT"});
    const [firstAmount, setFirstAmount] = useState<any>();
    const [secondAmount, setSecondAmount] = useState<any>();
    const [gas, setGas] = useState<number | undefined | string>();

    const [provider, setProvider] = useState<any>();
    const [signer, setSigner] = useState<any>();
    const [signerAddress, setSignerAddress] = useState("");
    const [ratio, setRatio] = useState<any>();
    const [transaction, setTransaction] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [firstBalance, setFirstBalance] = useState<any>();
    const [secondBalance, setSecondBalance] = useState<any>();


    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);

        signer.getAddress()
            .then(address => {
                setSignerAddress(address);
            })

        const wethBalace = await utils.getTokenBalance(signer, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6")
        setFirstBalance(wethBalace);
        console.log(wethBalace)
        const cmtBalace = await utils.getTokenBalance(signer, "0xfbf685cef334fcbbe4ecb45ccc9e1976e08b15df")
        setSecondBalance(cmtBalace);
        console.log(cmtBalace)
    };

    const makeSwap = async () => {
        const txHash = await utils.runSwap(transaction, signer, firstAmount); //스왑 호출

        openTransactionModal(true);
        getTxHash(txHash);
        setMadeTx(true);

        setFirstAmount("");
        setSecondAmount("");
        setRatio("");

        const wethBalace = await utils.getTokenBalance(signer, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6")
        setFirstBalance(wethBalace);
        console.log(wethBalace)
        const cmtBalace = await utils.getTokenBalance(signer, "0xfbf685cef334fcbbe4ecb45ccc9e1976e08b15df")
        setSecondBalance(cmtBalace);
        console.log(cmtBalace)

        /* const amount = Number(Number(firstAmount) * 10 ** firstToken.decimals);
        const address = await Moralis.User.current()?.get("ethAddress");
        openTransactionModal(true);
        try {
            const res = await Moralis.Plugins.oneInch.swap({
                chain: chain,
                fromTokenAddress: firstToken.address,
                toTokenAddress: secondToken.address,
                amount,
                fromAddress: address,
                slippage: 1,
            });
            openTransactionModal(true);
            getTxHash(res.transactionHash);
            setMadeTx(true);
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String((error as Error).message);
            getErrorMessage(message);
        } */
    };

    const getQuoteFirst = async (val: string) => {
        setLoading(true);
        setFirstAmount(val);
        try {
            await utils.getPrice(
                firstToken.symbol,
                secondToken.symbol
                ,
                firstAmount,
                10, //slippageAmount
                Math.floor(Date.now() / 1000 + (5 * 60)), //deadline
                signerAddress
            ).then(data => {
                setTransaction(data[0]);
                setSecondAmount(data[1]);
                setRatio(data[2]);
                setLoading(false);
                console.log("here", transaction);
            })
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String((error as Error).message);
            getErrorMessage(message);
            setLoading(false);
        }

        /* const amount = Number(Number(val) * 10 ** firstToken.decimals);
        setFirstAmount(val);
        if (amount === 0 || amount === undefined) {
            setFirstAmount("");
            setSecondAmount("");
            setGas(undefined);
            setTimeout(() => {
                if (secondAmount !== "") {
                    setSecondAmount("");
                }
            }, 300);
        } else if (firstToken.address && secondToken.address) {
            const quote = await Moralis.Plugins.oneInch.quote({
                chain, // The blockchain you want to use (eth/bsc/polygon)
                fromTokenAddress: firstToken.address, // The token you want to swap
                toTokenAddress: secondToken.address, // The token you want to receive
                amount,
            });
            setSecondAmount(quote.toTokenAmount / 10 ** quote.toToken.decimals);
            setGas(quote.estimatedGas);
        } */
    };

    const getQuoteSecond = async (val: string) => {
        setLoading(true);
        setSecondAmount(val);
        try {
            await utils.getPrice(
                secondToken.symbol
                , firstToken.symbol,
                secondAmount,
                10, //slippageAmount
                Math.floor(Date.now() / 1000 + (5 * 60)), //deadline
                signerAddress
            ).then(data => {
                setTransaction(data[0]);
                setSecondAmount(data[1]);
                setRatio(data[2]);
                setLoading(false);
                console.log("here", transaction);
            })
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String((error as Error).message);
            getErrorMessage(message);
            setLoading(false);
        }
        /* const amount = Number(Number(val) * 10 ** secondToken.decimals);
        setSecondAmount(val);
        if (amount === 0 || amount === undefined) {
            setFirstAmount("");
            setSecondAmount("");
            setGas(undefined);
            setTimeout(() => {
                if (firstAmount !== "") {
                    setFirstAmount("");
                }
            }, 300);
        } else if (firstToken.address && secondToken.address) {
            const quote = await Moralis.Plugins.oneInch.quote({
                chain, // The blockchain you want to use (eth/bsc/polygon)
                fromTokenAddress: secondToken.address, // The token you want to swap
                toTokenAddress: firstToken.address, // The token you want to receive
                amount,
            });
            setFirstAmount(quote.toTokenAmount / 10 ** quote.toToken.decimals);
            setGas(quote.estimatedGas);
        } */
    };

    return (
        <form className={isLight ? styles.light : styles.dark}>
            <div className="w-full rounded-3xl p-2 select-none ">
                <SwapFormHeader/>
                {
                    isSwitch ?
                        <div>
                            <SwapFormInput
                                initial={true}
                                tokenList={tokenList}
                                choose={setFirstToken}
                                selected={firstToken}
                                getQuote={getQuoteFirst}
                                value={firstAmount}
                                changeValue={setFirstAmount}
                                changeCounterValue={setSecondAmount}
                                loading={loading}
                                balance={firstBalance}
                            />
                            <div className={"flex justify-center items-center "}>
                                <SwitchButton></SwitchButton>
                            </div>
                            {loading ? (
                                <div className="h-[60%] flex justify-center items-center">
                                    <Circles height={50} width={50} color={isLight ? "#d97706" : "#3b82f6"}/>
                                </div>
                            ) : (
                                <SwapFormInput
                                    initial={true}
                                    tokenList={tokenList}
                                    choose={setSecondToken}
                                    selected={secondToken}
                                    getQuote={getQuoteSecond}
                                    value={secondAmount}
                                    changeValue={setFirstAmount}
                                    changeCounterValue={setFirstAmount}
                                    loading={loading}
                                    balance={secondBalance}
                                />
                            )}
                        </div>
                        :
                        <div>
                            <SwapFormInput
                                initial={true}
                                tokenList={tokenList}
                                choose={setSecondToken}
                                selected={secondToken}
                                getQuote={getQuoteSecond}
                                value={secondAmount}
                                changeValue={setFirstAmount}
                                changeCounterValue={setFirstAmount}
                                loading={loading}
                                balance={secondBalance}
                            />
                            <div className={"flex justify-center items-center "}>
                                <SwitchButton></SwitchButton>
                            </div>
                            {loading ? (
                                <div className="h-[60%] flex justify-center items-center">
                                    <Circles height={50} width={50} color={isLight ? "#d97706" : "#3b82f6"}/>
                                </div>
                            ) : (
                                <SwapFormInput
                                    initial={true}
                                    tokenList={tokenList}
                                    choose={setFirstToken}
                                    selected={firstToken}
                                    getQuote={getQuoteFirst}
                                    value={firstAmount}
                                    changeValue={setFirstAmount}
                                    changeCounterValue={setSecondAmount}
                                    loading={loading}
                                    balance={firstBalance}
                                />
                            )}
                        </div>
                }

                {ratio && (
                    <>
                        <div className="w-full h-3 flex items-center justify-center py-4">
                            <div
                                className="w-[95%] h-full flex items-center justify-end text-sm text-white font-semibold">
                                {`1 CMT = ${ratio} ETH`}
                            </div>
                        </div>
                    </>
                )}
                {/* {gas && (
                    <div className="w-full h-3 flex items-center justify-center py-4">
                        <div className="w-[95%] h-full flex items-center justify-end text-sm text-white font-semibold">
                            {t("swap_form.estimated")}
                            {gas}
                        </div>
                    </div>
                )} */}
                <SwapButton setLoginModalOpen={setLoginModalOpen} isLogin={isLogin} setIsLogin={setIsLogin}
                            trySwap={makeSwap}/>
            </div>
        </form>
    );
};

const styles = {
    light: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-90 w-11/12 sm:w-[500px]",
    dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-90 w-11/12 sm:w-[500px]",
};

export default SwapForm;

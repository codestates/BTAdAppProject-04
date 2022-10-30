import React from "react";
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { XIcon } from "@heroicons/react/solid";
import {
    DuplicateIcon,
    ExternalLinkIcon,
    CheckCircleIcon,
} from "@heroicons/react/outline";
import metamask from "../../assets/images/metamask.png";
import ThemeContext from "../../context/theme-context";
import { Oval } from "react-loader-spinner";
import ChainContext from "../../context/chain-context";
import Web3 from 'web3';
import { useMoralis } from "react-moralis";
import LoginMethodModal from "./LoginMethodModal";
declare let window: any;

type CreatePoolModalProps = {
    close(val: boolean): void;
    open(val: boolean): void;
    setLoginModalOpen(val: boolean): void;
};

const CreatePoolModal = ({ close, open, setLoginModalOpen }: CreatePoolModalProps): JSX.Element => {
    const themeCtx = useContext(ThemeContext);
    const chainCtx = useContext(ChainContext);
    const { isLight } = React.useContext(ThemeContext);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isAuthenticating, setisAuthenticating] = useState(false);
    const [walletChosen, setWalletChosen] = useState("");
    const [shortUserAddress, setshortUserAddress] = useState("");
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState("");
    const { t } = useTranslation();
    //const { authenticate, isAuthenticated, logout, isAuthenticating, user } = useMoralis();

    useEffect(() => {
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
                            setshortUserAddress(
                                String(result[0]).slice(0, 6) + "..." + String(result[0]).slice(-4)
                            );
                            setisAuthenticated(true);
                            setisAuthenticating(false);
                            setWalletChosen("Metamask");
                        }
                    }
                });
        }
    };

    return (
        <>

            <div
                className="absolute w-screen h-screen bg-gray-500 z-40 opacity-30"
                onClick={() => close(false)}
            ></div>

            {/* Header */}
            <div className={themeCtx.isLight ? styles.lightContainer : styles.darkContainer}>
                <div className="h-10 w-full flex flex-row justify-between items-center px-5">
                    {!isAuthenticated && (
                        <div
                            className={isLight ? styles.lightButton : styles.darkButton}
                            onClick={() => setLoginModalOpen(true)}
                        >
                            {t("nav.connect")}
                        </div>
                    )}
                    {isAuthenticated && (
                        <span className="font-semibold text-lg">{("create pool")}</span>
                    )}

                    <XIcon className="h-6 w-6 cursor-pointer" onClick={() => close(false)} />
                </div>

            </div>
        </>
    );
};

const styles = {
    lightContainer: `absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0`,
    darkContainer:
        "absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-blue-900 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0 text-gray-200",
    lightButton:
        "bg-orange-300 rounded-2xl p-2 border-2 border-white text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center",
    darkButton:
        "bg-blue-500 rounded-2xl p-2 border-2 border-blue-400 text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center",
    connectLight:
        "rounded-2xl bg-white flex justify-between items-center flex-1 max-w-[220px] p-1 font-bold md:max-w-[220px] cursor-pointer",
    connectDark:
        "rounded-2xl bg-blue-600 flex justify-between items-center flex-1 max-w-[220px] text-white p-1 font-bold md:max-w-[220px] cursor-pointer",
    addressLight:
        "text-sm flex-1 rounded-2xl h-full bg-gray-200 flex items-center justify-center",
    addressDark:
        "text-sm flex-1 rounded-2xl h-full bg-blue-500 flex items-center justify-center",
};

export default CreatePoolModal;

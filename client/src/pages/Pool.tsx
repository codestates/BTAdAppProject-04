import React, {useContext, useState} from "react";
import { TokenList } from "../types";
import ThemeContext from "../context/theme-context";
import {useMoralis} from "react-moralis";
import { useTranslation } from "react-i18next";
import Moralis from "moralis";
import { ChainHex, TransactionList } from "../types";
import ChainContext from "../context/chain-context";
import CreatePoolModal from "../components/UI/CreatePoolModal";

type PoolProps = {
    poolModalOpen: boolean;
    setPoolModalOpen(val: boolean): void;
    isOpen: boolean;
    setIsOpen(val: boolean): void;
};

const Pool = ({isOpen, setIsOpen, poolModalOpen, setPoolModalOpen, }: PoolProps): JSX.Element => {
    const {isLight} = React.useContext(ThemeContext);
    const { isAuthenticated } = useMoralis();
    const [isCreatePoolModalOpen, setIsCreatePoolModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    return (
        <>
            {poolModalOpen && <CreatePoolModal close={setPoolModalOpen} open={setIsOpen} setLoginModalOpen={setIsLoginModalOpen}/>}
            <div className="flex items-center justify-center flex-grow">
                {!isAuthenticated && (
                    <div className={isLight ? styles.light : styles.dark}>
                        <button
                            className={isLight ? styles.connectLight : styles.connectDark}
                            onClick={() => setPoolModalOpen(true)}
                        >
                            {("Create Pool")}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Pool;

const styles = {
    light:
        "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
    dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
    connectLight:
        "bg-orange-300 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
    connectDark:
        "bg-blue-500 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
    txLight:
        "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]",
    txDark:
        "border-2 border-blue-500 bg-blue-500 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]",
};
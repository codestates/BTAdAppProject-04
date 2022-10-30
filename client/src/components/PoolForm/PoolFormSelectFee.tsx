import React from "react";
import {useTranslation} from "react-i18next";
import PoolFormChangeTokenButton from "./PoolFormChangeTokenButton";
import TokenSelectModal from "../UI/TokenSelectModal";
import {Chain, Fee, TokenList} from "../../types";
import type {SelectedToken} from "../../types";
import {DebounceInput} from "react-debounce-input";
import SelectedFee from "./SelectedFee";

type PoolFormSelectFeeProps = {

};

const PoolFormSelectFee = ({}: PoolFormSelectFeeProps): JSX.Element => {
    const [isSelectFee, setIsSelectFee] = React.useState("");
    const {t} = useTranslation();

    React.useEffect(() => {

    }, [isSelectFee]);

    const handleClick = (val: Fee) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            setIsSelectFee(val);
            console.log(val)
        };
    };

    console.log(isSelectFee);


    return (
            <div className="flex items-center w-full ">

                {/* 0.01% */}
                <div className={isSelectFee === '0.01' ? styles.selectedStyle : styles.basis} onClick={handleClick("0.01")}>
                    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50" >
                        <span className="font-semibold">{"0.01%"}</span>
                    </div>
                    <span className="font-semibold">{"Best for very stable pairs."}</span>
                </div>

                {/* 0.05% */}
                <div className={isSelectFee === '0.05' ? styles.selectedStyle : styles.basis} onClick={handleClick("0.05")} >
                    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50" >
                        <span className="font-semibold">{"0.05%"}</span>
                    </div>
                    <span className="font-semibold">{"Best for stable pairs."}</span>
                </div>

                {/* 0.3% */}
                <div className={isSelectFee === '0.3' ? styles.selectedStyle : styles.basis} onClick={handleClick("0.3")}>
                    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50">
                        <span className="font-semibold">{"0.3%"}</span>
                    </div>
                    <span className="font-semibold">{"Best for most pairs."}</span>
                </div>

                {/* 1% */}
                <div className={isSelectFee === '1' ? styles.selectedStyle : styles.basis} onClick={handleClick("1")}>
                    <div className="w-full flex justify-between rounded-3xl p-2 text-neutral-50">
                        <span className="font-semibold">{"1%"}</span>
                    </div>
                    <span className="font-semibold">{"Best for exotic pairs."}</span>
                </div>

            </div>
    );
};

const styles = {
    selectedStyle:
        "border-2 border-solid border-white w-full rounded-3xl p-2 m-1 select-none",
    basis:
        "border-2 border-solid border-cyan-700 w-full rounded-3xl p-2 m-1 select-none",

};

export default PoolFormSelectFee;

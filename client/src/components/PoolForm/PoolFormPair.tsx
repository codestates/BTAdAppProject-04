import React from "react";
import {useTranslation} from "react-i18next";
import PoolFormChangeTokenButton from "./PoolFormChangeTokenButton";
import TokenSelectModal from "../UI/TokenSelectModal";
import {TokenList} from "../../types";
import type {SelectedToken} from "../../types";
import {DebounceInput} from "react-debounce-input";

type PoolFormInputProps = {
    initial?: boolean;
    tokenList: TokenList;
    choose(val: SelectedToken): void;
    selected: SelectedToken;
    getQuote(val: string): void;
    value: number | undefined | string;
    changeValue(val: number | undefined | string): void;
    changeCounterValue(val: number | undefined | string): void;
};

const PoolFormPair = ({
                          initial,
                          tokenList,
                          choose,
                          selected,
                          value,
                          getQuote,
                          changeValue,
                          changeCounterValue,
                      }: PoolFormInputProps): JSX.Element => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const {t} = useTranslation();
    const [inputValue, setInputValue] = React.useState<number | undefined | string>();
    React.useEffect(() => {
        if (value === 0 || value === "") {
            setInputValue("");
            changeCounterValue("");
        }
        setInputValue(value);
    }, [value, setInputValue, changeCounterValue]);

    return (
            <div className="flex items-center w-full ">
                <PoolFormChangeTokenButton
                    initial={initial}
                    select={setIsSelecting}
                    selected={selected}
                />
                <PoolFormChangeTokenButton
                    initial={initial}
                    select={setIsSelecting}
                    selected={selected}
                />

                {isSelecting && (
                    <TokenSelectModal
                        tokenList={tokenList}
                        select={setIsSelecting}
                        choose={choose}
                        isSelecting={setIsSelecting}
                    />
                )}
            </div>
    );
};

export default PoolFormPair;

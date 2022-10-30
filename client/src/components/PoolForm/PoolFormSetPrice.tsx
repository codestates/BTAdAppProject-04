import React from "react";
import {useTranslation} from "react-i18next";
import PoolFormTokenButton from "./PoolFormTokenButton";
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

const PoolFormSetPrice = ({
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
        <div className="flex items-center w-full mb-2">
            <div className="flex items-center w-full ">
                <DebounceInput
                    className="m-1 min-w-0 h-full rounded-2xl bg-gray-100 text-2xl font-medium font-inc focus:outline-none px-1"
                    placeholder={(" min price")}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => getQuote(e.target.value)}
                    value={''}
                />
                <DebounceInput
                    className="m-1 min-w-0 h-full rounded-2xl bg-gray-100 text-2xl font-medium font-inc focus:outline-none px-1"
                    placeholder={(" max price")}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => getQuote(e.target.value)}
                    value={''}
                />
            </div>
        </div>
    );
};

export default PoolFormSetPrice;

import React from "react";
import { useTranslation } from "react-i18next";
import { XIcon } from "@heroicons/react/solid";
import TokenListItem from "./TokenListItem";
import { TokenDetails, TokenList } from "../../types";
import ThemeContext from "../../context/theme-context";
import type { SelectedToken,} from "../../types";
import { DebounceInput } from "react-debounce-input";
import { INSPECT_MAX_BYTES } from "buffer";
import cmt from "../../assets/images/cmt.png";
import weth from "../../assets/images/weth.png";

type TokenSelectModalProps = {
  initial?: boolean;
  tokenList: TokenList;
  select(val: boolean): void;
  choose(val: SelectedToken): void;
  isSelecting(val: boolean): void;
};

const TokenSelectModal = ({
  tokenList,
  select,
  choose,
  isSelecting,
}: TokenSelectModalProps): JSX.Element => {
  const { t } = useTranslation();
  const themeCtx = React.useContext(ThemeContext);
  const [searchedValue, setSearchedValue] = React.useState("");
  const [customTokenList, setCustomTokenList] = React.useState<TokenDetails[]>(tokenList);

  const arr = [{logoURI: '', name: 'CodeMonkey Token', symbol: 'CMT', tags: [],
  address: '0xfbf685cef334fcbbe4ecb45ccc9e1976e08b15df', decimals: 18}];
  arr.push({logoURI: '', name: 'BlueChipToken', symbol: 'BCT', tags: [],
  address: '0x8a928c5c8417A3481675C0CDa5eBDDcbA464ba93', decimals: 18});
  arr.push({logoURI: '', name: 'YerinToken', symbol: 'YRT', tags: [],
  address: '0x8C7F591f92D654aF47fA1A98076966Ef2915003d', decimals: 18});
  arr.push({logoURI: '', name: 'Wrapped Ether', symbol: 'WETH', tags: [],
  address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', decimals: 18});

  React.useEffect(() => {
  
    tokenList = arr;
    setCustomTokenList(tokenList);
  }, []);
  
  React.useEffect(() => {
    if (searchedValue.slice(0, 2).includes("0x")) {
      const filteredList = arr.filter((token) =>
        token.address.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()),
      );
      setCustomTokenList(filteredList);
    }

    if (!searchedValue.slice(0, 2).includes("0x")) {
      const filteredList = arr.filter((token) =>
        token.symbol.includes(searchedValue.toUpperCase()),
      );
      setCustomTokenList(filteredList);
    }

    if (searchedValue.length === 0) {
      setCustomTokenList(tokenList);
    }
  }, [searchedValue, setCustomTokenList, tokenList]);

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-500 z-30 opacity-20"></div>
      <div className={themeCtx.isLight ? styles.light : styles.dark}>
        {/* Modal Header */}
        <div className="h-10 w-full flex flex-row justify-between items-center px-5">
          <span className="font-semibold text-lg">{t("choose-token.swap")}</span>
          <XIcon className="h-6 w-6" onClick={() => select(false)} />
        </div>

        {/* Modal Search Bar */}
        <div className="h-24 p-3 pb-5 border-b border-b-gray-200">
          <DebounceInput
            debounceTimeout={300}
            className="border border-gray-200 w-full h-full rounded-2xl px-3"
            placeholder={t("choose-token.search")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchedValue(e.target.value)
            }
          />
        </div>

        {/* Modal List  */}
        <div className="flex-1 p-4 overflow-hidden">
          {customTokenList && (
            <ul className="w-full h-full overflow-y-scroll">
              {customTokenList.map(({ logoURI, name, symbol, address, decimals }) => (
                <TokenListItem
                  key={address}
                  logo={logoURI}
                  name={name}
                  symbol={symbol}
                  choose={choose}
                  isSelecting={isSelecting}
                  address={address}
                  decimals={decimals}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TokenSelectModal;

const styles = {
  dark: "absolute w-screen h-[70%] bottom-0 left-0 bg-blue-800 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0",
  light:
    "absolute w-screen h-[70%] bottom-0 left-0 bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0",
};

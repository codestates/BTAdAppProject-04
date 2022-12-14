import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { ThemeContextProvider } from "./context/theme-context";
import { AuthContextProvider } from "./context/auth-context";
import { ChainContextProvider } from "./context/chain-context";
import { SwitchContextProvider} from "./context/switch-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const SERVER_URL = '1';
const APP_ID = '001';

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={SERVER_URL}
      appId={APP_ID}
    >
      <ThemeContextProvider>
        <ChainContextProvider>
          <AuthContextProvider>
            <SwitchContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/#/swap?chain=mainnet" element={<App />} />
                <Route path="transactions" element={<App />} />
                <Route path="pool" element={<App />} />
                <Route path="createPool" element={<App />} />
              </Routes>
            </BrowserRouter>
            </SwitchContextProvider>
          </AuthContextProvider>
        </ChainContextProvider>
      </ThemeContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
);

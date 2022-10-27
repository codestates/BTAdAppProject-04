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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const SERVER_URL = process.env.REACT_APP_SERVER_URL_MORALIS!
const APP_ID = 'cEa3Q93ib30ySNAsqMKcUKvLCJk3gf7oTOqqwiQLKu0kMtncrozxPpPB2Illayw2'!

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={SERVER_URL}
      appId={APP_ID}
    >
      <ThemeContextProvider>
        <ChainContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/#/swap?chain=mainnet" element={<App />} />
                <Route path="transactions" element={<App />} />
              </Routes>
            </BrowserRouter>
          </AuthContextProvider>
        </ChainContextProvider>
      </ThemeContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
);

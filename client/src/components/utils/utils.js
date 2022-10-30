import {ethers, BigNumber} from 'ethers'

const {AlphaRouter} = require("@uniswap/smart-order-router");
const ABI = require("../../abis/abi.json");
const {Token, CurrencyAmount, TradeType, Percent} = require("@uniswap/sdk-core");
const chainId = 5;
const JSBI = require("jsbi");
const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const web3Provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_INFURA_URL_TESTNET
);
const router = new AlphaRouter({chainId: chainId, provider: web3Provider});

const WETH_Name = "Wrapped Ether";
const WETH_Symbol = "WETH";
const WETH_ADDRESS = process.env.REACT_APP_WETH_ADDRESS;


const CMT_Name = "CodeMonkeyToken";
const CMT_Symbol = "CMT";
const CMT_ADDRESS = process.env.REACT_APP_CMT_ADDRESS;


const WETH = new Token(chainId, WETH_ADDRESS, 18, WETH_Symbol, WETH_Name);
const CMT = new Token(chainId, CMT_ADDRESS, 18, CMT_Symbol, CMT_Name);


const WethContract = () => new ethers.Contract(WETH_ADDRESS, ABI, web3Provider);
const CMTContract = () => new ethers.Contract(CMT_ADDRESS, ABI, web3Provider);

let tokenMap = new Map();
tokenMap.set("WETH",WETH)
tokenMap.set("CMT",CMT)

export const utils = {
    getCMTBalance: async (signer) => {  // signer 의 토큰 개수 리턴
        const CMTContract = new ethers.Contract(process.env.REACT_APP_CMT_ADDRESS, ABI, signer)
        return ethers.utils.formatEther(await CMTContract.balanceOf(signer.getAddress()))
    },
    getETHBalance: async (signer) => {
        return ethers.utils.formatEther(await signer.getBalance())
    },
    getWETHBalance: async (signer) => {
        const WETHContract = new ethers.Contract(WETH_ADDRESS, ABI, signer)
        return ethers.utils.formatEther(await WETHContract.balanceOf(signer.getAddress()))
    },
    getPrice: async (inputToken,outputToken,inputAmount, slippageAmount, deadline, walletAddress) => {
        console.log(inputToken,outputToken,inputAmount, slippageAmount, deadline, walletAddress)
        const percentSlippage = new Percent(slippageAmount, 100);
        const wei = ethers.utils.parseUnits(inputAmount.toString(), 18);
        const currencyAmount = CurrencyAmount.fromRawAmount(tokenMap.get(inputToken), JSBI.BigInt(wei));
        const route = await router.route(currencyAmount, tokenMap.get(outputToken), TradeType.EXACT_INPUT, {
            recipient: walletAddress,
            slippageTolerance: percentSlippage,
            deadline: deadline,
        });
        console.log(route);
        const transaction = {
            data: route.methodParameters.calldata,
            to: V3_SWAP_ROUTER_ADDRESS,
            value: BigNumber.from(route.methodParameters.value),
            from: walletAddress,
            gasPrice: BigNumber.from(route.gasPriceWei),
            gasLimit: ethers.utils.hexlify(1000000),
        };
        const quoteAmountOut = route.quote.toFixed(6);
        const ratio = (inputAmount / quoteAmountOut).toFixed(3);
        return [transaction, quoteAmountOut, ratio];
    },
    runSwap: async (transaction, signer, inputAmount) =>{
        const approvalAmount = ethers.utils.parseUnits("10", 18).toString();
        const contract0 = WethContract();
        const allowance = await contract0.allowance(
            await signer.getAddress(),
            V3_SWAP_ROUTER_ADDRESS
        );
        if (allowance < inputAmount * 10 ** 18) {  // 허가되지 않았다면 먼저 허가를 받음
            let tx = await contract0
                .connect(signer)
                .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);
            await tx.wait();
        }
        let tx = await signer.sendTransaction(transaction);
        await tx.wait();
        return tx
    }
}

import {ethers} from 'ethers'
const CMT = require("../../abis/CodeMonkeyToken.json");


export const utils= {
    getCMTBalance: async (signer) => {  // signer 의 토큰 개수 리턴
        const CMTContract = new ethers.Contract(process.env.REACT_APP_CMT_ADDRESS, CMT.abi, signer)
        return ethers.utils.formatEther(await CMTContract.balanceOf(signer.getAddress()))
    },
    getETHBalance: async (signer) => {
        return ethers.utils.formatEther(await signer.getBalance())
    },
}

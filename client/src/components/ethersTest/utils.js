import {ethers} from 'ethers'
const env = process.env;
const CMT = require("../../abis/CMT.json");



const utils = {
    getCMTBalance: async (chainName) => {  // 체인 이름을 토대로 체인 오브젝트 리턴
        const CMTContract = new ethers.Contract(env.CMT_ADDRESS, CMT.abi, signer)
        console.log()
        return chains.find(({chain_name}) => chain_name === chainName); //osmosis
    },




}


module.exports = utils;
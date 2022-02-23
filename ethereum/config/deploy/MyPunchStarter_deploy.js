const path = require('path');
const fse = require("fs-extra");
const HDWalletProvider = require('@truffle/hdwallet-provider')
const reqPath = path.join(__dirname,'../../../');
const envPath = path.join(reqPath,'.env');
require('dotenv').config({ path: envPath })
const Web3 = require('web3')
const {buildContracts} = require("../contractCompiler");

/**
 *
 * @param apiInfura
 * @param contractCompiled
 * @returns {Promise<void>}
 */
const deploy = async (apiInfura = process.env.INFURA_RINKEBY_ENDPOINT_V3, contractCompiled) => {
    /**
     * Purpose:
     * Connect to to an specific EN
     * Unlock your account to make transactions against EN.
     * @type {HDWalletProvider}
     */
    console.log("ABI: " + JSON.stringify(contractCompiled.abi))
    const provider = new HDWalletProvider( process.env.ACCOUNT_MNEMONIC, apiInfura );
    const web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts();
    console.log ('Attempting to deploy from account', accounts[0]);
    if (contractCompiled){
        const data = contractCompiled.evm.bytecode.object;
        const deployedContract = await new web3.eth.Contract(contractCompiled.abi)
            .deploy({  data  })
            .send({ gas: 5000000 , from: accounts[0] });

        console.log('Contract deployed to', deployedContract.options.address.toLowerCase())
        printLastDeployDirection(deployedContract.options.address.toLowerCase())

    }
    await provider.engine.stop();
}

function printLastDeployDirection(address) {
    const today = new Date();
    fse.outputFileSync(
        path.resolve("./", 'last_deploy.json'),
        JSON.stringify(JSON.parse(`{ 
            "last_deploy": "${(today.getMonth()+1) +"-"+today.getDate()+"-"+today.getFullYear()+":"+today.getTime()}, " +
            "address": "${address}" + 
        "}`))
    )
}



const deployRinkeby = async () => {
    try {
        console.log("Build Campaign")
        await buildContracts();
        console.log("Get Campaign file compiled")
        const campaignFactory = require('../../../buildContract/CampaignFactory.json')
        console.log("deploy on Rinkeby")
        await deploy(process.env.INFURA_RINKEBY_ENDPOINT_V3, campaignFactory);
        console.log("end")
    } catch (e) {
        console.error(e.message)
    }
}

deployRinkeby();

module.exports = {
    deployRinkeby
}
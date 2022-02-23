const {compileContract, getAbiFromContract, compileAndPrintContract} = require("zicky");

const compileMyPunchStarter = () => {
    return compileContract('MyPunchStarter.sol', "ethereum/contracts")
}
const compileCampaignFactory = () => {
    return compileContract('MyPunchStarter.sol', "ethereum/contracts", "CampaignFactory")
}

const buildContracts = async () => {
    await compileAndPrintContract('MyPunchStarter.sol', "ethereum/contracts")
}



module.exports = {
    compileMyPunchStarter,
    compileCampaignFactory,
    buildContracts
}


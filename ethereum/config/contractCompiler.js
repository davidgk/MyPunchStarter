const {compileContract, getAbiFromContract} = require("zicky");

const compileMyPunchStarter = () => {
    return compileContract('MyPunchStarter.sol', "ethereum/contracts")
}
const compileCampaignFactory = () => {
    return compileContract('MyPunchStarter.sol', "ethereum/contracts", "CampaignFactory")
}

const getAbiCampaign = () => {
    return getAbiFromContract('MyPunchStarter.sol', "ethereum/contracts")
}
module.exports = {
    compileMyPunchStarter,
    compileCampaignFactory
}


const {compileContract, getAbiFromContract} = require("zicky");

const compileMyPunchStarter = () => {
    return compileContract('MyPunchStarter.sol', "smartContract/contracts")
}
const compileCampaignFactory = () => {
    return compileContract('CampaignFactory.sol', "smartContract/contracts")
}

const getAbiCampaign = () => {
    return getAbiFromContract('MyPunchStarter.sol', "smartContract/contracts")
}
module.exports = {
    compileMyPunchStarter,
    compileCampaignFactory
}


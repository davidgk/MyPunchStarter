const {compileContract} = require("zicky");

const compileMyPunchStarter = () => {
    return compileContract('MyPunchStarter.sol', "smartContract/contracts")
}
const compileCampaignFactory = () => {
    return compileContract('MyPunchStarter.sol', "smartContract/contracts", "CampaignFactory")
}

module.exports = {
    compileMyPunchStarter,
    compileCampaignFactory
}


const {compileContract} = require("zicky");

const compileMyPunchStarter = () => {
    return compileContract('MyPunchStarter.sol', "smartContract/contracts")
}

module.exports = {
    compileMyPunchStarter
}


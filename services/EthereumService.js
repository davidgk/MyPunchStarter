import factory from "../ethereum/config/factory";
import web3 from "../ethereum/config/web3";
import Campaign from "../lastCompiledDeployed/MyPunchStarter.json";
import lastDeploy from "../lastCompiledDeployed/last_deploy.json";


const getContractSummary = async (contractAddress) => {
    const instance = new web3.eth.Contract(
        Campaign.abi,
        contractAddress
    );
    return await instance.methods.getSummary().call();
}

const createCampaign = async (weiValue) => {
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(weiValue)
        .send({
            from: accounts[0]
        });

}

export default {
    createCampaign,
    getContractSummary
}
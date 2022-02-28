import factory from "../ethereum/config/factory";
import web3 from "../ethereum/config/web3";
import Campaign from "../lastCompiledDeployed/MyPunchStarter.json";


function connectToSingleCampaign(contractAddress) {
    return new web3.eth.Contract(
        Campaign.abi,
        contractAddress
    );
}

const createContributor  = async (address, contribution) => {
    const instance = connectToSingleCampaign(address);
    const accounts = await getAccounts();
    await instance.methods.contribute()
        .send({
            from: accounts[0],
            value: contribution
        });
}


const getContractSummary = async (contractAddress) => {
    const instance = connectToSingleCampaign(contractAddress);
    return await instance.methods.getSummary().call();
}

function getAccounts() {
    return web3.eth.getAccounts();
}

const createRequest = async (address, description, value, recipient) => {
    const instance = connectToSingleCampaign(address);
    const accounts = await getAccounts();
    await instance.methods.createRequest(description, value, recipient)
        .send({
            from: accounts[0]
        });
}

const createCampaign = async (weiValue) => {
    const accounts = await getAccounts();
    await factory.methods.createCampaign(weiValue)
        .send({
            from: accounts[0]
        });

}

const getDeployedCampaigns = async () =>  {
    return await factory.methods.getDeployedCampaigns().call();
}

const getRequestCount= async (address) => {
    const instance = connectToSingleCampaign(address);
    return await instance.methods.getRequestsCount().call();
}

export default {
    createCampaign,
    getContractSummary,
    getDeployedCampaigns,
    createContributor,
    getRequestCount,
    createRequest,

}
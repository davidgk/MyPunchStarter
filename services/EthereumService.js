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
    const campaign = connectToSingleCampaign(address);
    let  requestCount  = await campaign.methods.getRequestsCount().call();
    return {requestCount, campaign};
}

const getAllRequest= async (address, campaign, requestCount) => {
    const instance = campaign || connectToSingleCampaign(address);
    return  await Promise.all(
       Array(Number(requestCount)).fill().map(async(element, index) => {
          return await instance.methods.requests(index).call()
       })
    );
}

export default {
    createCampaign,
    getContractSummary,
    getDeployedCampaigns,
    createContributor,
    getRequestCount,
    createRequest,
    getAllRequest,

}
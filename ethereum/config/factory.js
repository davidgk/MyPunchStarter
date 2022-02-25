import web3 from "./web3";
import CampaignFactory from "../../lastCompiledDeployed/CampaignFactory.json"
import lastDeploy from "../../lastCompiledDeployed/last_deploy.json"

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    lastDeploy.address
);

export default instance;
import factory from "../ethereum/config/factory";
import web3 from "../ethereum/config/web3";


const createCampaign = async (weiValue) => {
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(weiValue)
        .send({
            from: accounts[0]
        });

}

export default {
    createCampaign
}
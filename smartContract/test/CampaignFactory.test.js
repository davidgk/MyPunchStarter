
const {getDeployManager} = require("zicky");
const {expect} = require("chai");
const {compileCampaignFactory} = require("../config/contractCompiler");
describe ('factoryFactory Contract tests', () => {
    let accounts, factory, contractDeployer, contractCompiled, account;
    beforeEach(async () => {
        // Get a list of all accounts
        contractCompiled = compileCampaignFactory()
        contractDeployer = await getDeployManager(contractCompiled, 5000000)
        accounts = contractDeployer.accounts;
        account = accounts[0];
    })
    describe('when the factory is deployed', () => {
        beforeEach(async () =>{
            factory = await contractDeployer.deployContract(account);
        })
        it( 'obtain accounts from web3', () => {
            expect(accounts.length > 0).to.be.true;
        })
        it( 'obtain accounts from web3', () => {
            expect(accounts.length > 0).to.be.true;
        })
        describe('when we deploy it  with an account ' , () => {
            it( 'it was successful', async () => {
                expect(factory).not.to.be.null;
                // means that it was successfully deploy if address exists
                console.log(factory.options.address)
                expect(factory.options.address).not.to.be.null;
                expect(factory.options.address.length).to.eq(42);
            })
            it( 'manager was corrected assigned', async () => {
                let manager = await factory.methods.manager().call();
                expect(manager.toLowerCase()).to.eq(account);
            })
        })
    })
    describe('createCampaign', () => {
        beforeEach(async () =>{
            factory = await contractDeployer.deployContract(account);
        })
        it( 'it adds the direction from the new contract', async () => {
            await factory.methods.createCampaign(0).send({from: accounts[1].toLowerCase(), gas: 10000000});
            const deployedCampaigns = await factory.methods.deployedCampaigns(0).call();
            expect(deployedCampaigns.length).to.eq(42);
        })
    })
})
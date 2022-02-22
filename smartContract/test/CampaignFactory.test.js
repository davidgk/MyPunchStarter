
const {getDeployManager} = require("zicky");
const {expect} = require("chai");
const {compileCampaignFactory, compileMyPunchStarter} = require("../config/contractCompiler");
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
        it('once created I can interact with the contract deployed and account 1 is its manager', async () => {
            await factory.methods.createCampaign(0).send({from: accounts[1].toLowerCase(), gas: 10000000});
            const contractAbi = compileMyPunchStarter().abi;
            const campaignAddress = await factory.methods.deployedCampaigns(0).call();
            let Contract = contractDeployer.getNetwork().Contract;
            const deployedContractInTheNetwork = new Contract(contractAbi, campaignAddress);
            let manager = await deployedContractInTheNetwork.methods.manager().call();
            expect(manager.toLowerCase()).to.eq(accounts[1].toLowerCase());
        })
    })
    describe('getDeployedCampaigns', () => {
        beforeEach(async () =>{
            factory = await contractDeployer.deployContract(account);
            await factory.methods.createCampaign(0).send({from: accounts[1].toLowerCase(), gas: 10000000});
        })
        it( 'it adds the direction from the new contract', async () => {
            const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
            expect(deployedCampaigns.length).to.eq(1);
        })
    })
})
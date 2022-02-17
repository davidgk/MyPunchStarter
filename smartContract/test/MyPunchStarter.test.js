// contract test code will go here
const chaiAsPromised = require('chai-as-promised');
const {expect} = require('chai');
// Ethereum test network
const ganache = require('ganache-cli');
// how to communicate our code with that.
const Web3 = require('web3')
const path = require("path");
const fs = require("fs");
const {compileMyPunchStarter} = require("../config/contractCompiler");
// get the interface and definition from contract , once compiled



const localNetworkProvider = ganache.provider();
const web3 = new Web3(localNetworkProvider)

    /**
     *  web3 Main task up to now:
     *  1.- give the accounts unlock to tests our contracts
     *  2.- Deploy our contracts
     *  To deploy it only need the ABI and the bitecode
     *  3.- Communicate through JS apps to our contracts deployed on Network     *
     *  To interact with the contract we need:
     *  ABI ( the interface ! )  and the address of deployed contract!
    */



async function deployContract(contractDeployer, contractCompiled, arguments, account, value = 0) {
    return contractDeployer
        // create the transaction Object to be sent
        .deploy({data: contractCompiled.evm.bytecode.object, arguments})
        .send({from: account, gas: 1000000, value});
}

describe ('MyPunchStarter Contract tests', () => {
    let accounts, campaign, contractDeployer, contractCompiled,account;
    beforeEach(async () => {
        // Get a list of all accounts
        accounts = await web3.eth.getAccounts();
        // Use one of those accounts to deploy the contract
        contractCompiled = compileMyPunchStarter()
        // Teaches to web3 about what methods and campaign has, remember
        // web3 has the bridge role between ou contract and EN
        // abi is the JS layer between deployed code and us
        // we should pass the interface, under JSON format, said nothing about specific contract
        contractDeployer = new web3.eth.Contract(contractCompiled.abi);
        account = accounts[0];
        campaign = await deployContract(contractDeployer, contractCompiled, [], account);
    })
    it( 'obtain accounts from web3', () => {
       expect(accounts.length > 0).to.be.true;
    })
    describe('when we deploy it  with an account ' , () => {
        it( 'it was successful', async () => {
            expect(campaign).not.to.be.null;
            // means that it was successfully deploy if address exists
            console.log(campaign.options.address)
            expect(campaign.options.address).not.to.be.null;
            expect(campaign.options.address.length).to.eq(42);
        })
        it( 'manager was corrected assigned', async () => {
            expect(await campaign.methods.manager().call()).to.eq(account);
        })
    })
})
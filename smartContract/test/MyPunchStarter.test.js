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


const STD_ERROR_TX = 'VM Exception while processing transaction: revert';
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
    const MINIMUN_CONTRIBUTION = web3.utils.toWei("1", 'ether');
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
    })
    describe('when the campaign has a correct minimumContribution', () => {
        beforeEach(async () =>{
            campaign = await deployContract(contractDeployer, contractCompiled, [100], account);
        })
        it( 'obtain accounts from web3', () => {
            expect(accounts.length > 0).to.be.true;
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
            it( 'minimumContribution is assigned', async () => {
                expect(await campaign.methods.minimumContribution().call()).to.eq(String(100));
            })
        })
    })

    describe('#contribute', () => {
        let contributor
        const VALID_ETHER_VALUE_WEI = web3.utils.toWei("0.01", 'ether');
        describe('when the campaign has a correct minimumContribution', () => {
            beforeEach(async () => {0
                campaign = await deployContract(contractDeployer, contractCompiled, [100], account);
                contributor = accounts[1]
            });
            it('and contributor add the correct amount should be added into approvers', async () => {
                await campaign.methods.contribute().send({ from: contributor, value: VALID_ETHER_VALUE_WEI  });
                const contributorSaved = await campaign.methods.approvers(0).call();
                expect(contributorSaved).to.eq(contributor);
            })
            it('and contributor add incorrect amount should throw an error', async () => {
                try {
                    await campaign.methods.contribute().send({ from: contributor, value: 20  });
                    expect.fail('Should fail')
                } catch (e) {
                    expect(e.message).to.eq(STD_ERROR_TX)
                }
            })
        })
    })

    describe('when the campaign has an incorrect minimumContribution', () => {
        it( 'should throw an error', async () => {
            try {
                campaign = await deployContract(contractDeployer, contractCompiled, [-1], account);
                expect.fail('Should fail')
            } catch (e) {
                expect(e.message).to.eq('value out-of-bounds (argument="minimum", value=-1, code=INVALID_ARGUMENT, version=abi/5.0.7)')
            }
        })
    })

})
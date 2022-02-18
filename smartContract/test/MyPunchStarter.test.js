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
const {getDeployManager} = require("zicky");
// get the interface and definition from contract , once compiled


const STD_ERROR_TX = 'Transaction has been reverted by the EVM:';

describe ('MyPunchStarter Contract tests', () => {
    let accounts, campaign, contractDeployer, contractCompiled, account, MINIMUN_CONTRIBUTION;
    beforeEach(async () => {
        // Get a list of all accounts
        contractCompiled = compileMyPunchStarter()
        contractDeployer = await getDeployManager(contractCompiled)
        MINIMUN_CONTRIBUTION = contractDeployer.getWeb3Object().utils.toWei("1", 'ether');
        accounts = contractDeployer.accounts;
        account = accounts[0];
    })
    describe('when the campaign has a correct minimumContribution', () => {
        beforeEach(async () =>{
            campaign = await contractDeployer.deployContract(account, [100]);
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
                let manager = await campaign.methods.manager().call();
                expect(manager.toLowerCase()).to.eq(account);
            })
            it( 'minimumContribution is assigned', async () => {
                expect(await campaign.methods.minimumContribution().call()).to.eq(String(100));
            })
        })
    })

    describe('#contribute', () => {
        let contributor, VALID_ETHER_VALUE_WEI

        describe('when the campaign has a correct minimumContribution', () => {
            beforeEach(async () => {
                VALID_ETHER_VALUE_WEI = contractDeployer.getWeb3Object().utils.toWei("0.01", 'ether');
                campaign = await contractDeployer.deployContract(account, [100]);
                contributor = accounts[1]
            });
            it('and contributor add the correct amount should be added into approvers', async () => {
                await campaign.methods.contribute().send({ from: contributor, value: VALID_ETHER_VALUE_WEI  });
                const contributorSaved = await campaign.methods.approvers(0).call();
                expect(contributorSaved.toLowerCase()).to.eq(contributor);
            })
            it('and contributor add incorrect amount should throw an error', async () => {
                try {
                    await campaign.methods.contribute().send({ from: contributor, value: 20  });
                    expect.fail('Should fail')
                } catch (e) {
                    expect(e.message.split('\n')[0]).to.eq(STD_ERROR_TX)
                }
            })
        })
    })

    describe('when the campaign has an incorrect minimumContribution', () => {
        it( 'should throw an error', async () => {
            try {
                campaign = await contractDeployer.deployContract(account, [-1]);
                expect.fail('Should fail')
            } catch (e) {
                expect(e.message.split('\n')[0]).to.eq('value out-of-bounds (argument="minimum", value=-1, code=INVALID_ARGUMENT, version=abi/5.0.7)')
            }
        })
    })

})
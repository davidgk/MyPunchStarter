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
                const approvers = await campaign.methods.approvers(contributor.toLowerCase()).call();
                expect(approvers).to.be.true;
            })

            it('and contributor not exists within approvers should trow an error', async () => {
                try {
                    await campaign.methods.approvers("0xsomenotexistantapprover").call();
                    expect.fail('Should fail')
                } catch (e) {
                    expect(e.message.split('\n')[0]).to.eq("invalid address (argument=\"address\", value=\"0xsomenotexistantapprover\", code=INVALID_ARGUMENT, version=address/5.5.0) (argument=null, value=\"0xsomenotexistantapprover\", code=INVALID_ARGUMENT, version=abi/5.0.7)")
                }
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

    describe('#createRequest', () => {
        let anotherAccount, value, recipient, VALID_ETHER_VALUE_WEI;
        const DESCRIPTION_REQUEST = "Some description"
        describe('and manager creates a new Request', () => {
            beforeEach(async () => {
                value = contractDeployer.getWeb3Object().utils.toWei("0.1", 'ether');
                campaign = await contractDeployer.deployContract(account, [100]);
                recipient = accounts[1]
                anotherAccount = accounts[2]

            });
            it(`when an user with account which is a contributor can approve it approve it`, async () => {
                await campaign.methods.createRequest(DESCRIPTION_REQUEST, value, recipient).send({ from: account, gas: 1000000 });// TOOD
                const request = await campaign.methods.requests(0).call();
                expect(request.description).to.eq(DESCRIPTION_REQUEST);
                expect(request.value).to.eq(value);
                expect(request.recipient.toLowerCase()).to.eq(recipient);
                expect(request.approvalCount).to.eq("0");
            })
        })

    })

    describe ('#approveRequest', () => {
        let anotherAccount, value, recipient, VALID_ETHER_VALUE_WEI;
        const DESCRIPTION_REQUEST = "Some description"
        describe('and we have several contributors', () => {
            beforeEach(async () => {
                campaign = await contractDeployer.deployContract(account, [100]);
                VALID_ETHER_VALUE_WEI = contractDeployer.getWeb3Object().utils.toWei("0.01", 'ether');
                await campaign.methods.contribute().send({ from: accounts[1].toLowerCase(), value: VALID_ETHER_VALUE_WEI  });
                await campaign.methods.contribute().send({ from: accounts[2].toLowerCase(), value: VALID_ETHER_VALUE_WEI  });
                await campaign.methods.contribute().send({ from: accounts[3].toLowerCase(), value: VALID_ETHER_VALUE_WEI  });
            });
            describe('and manager creates a new Request', () => {
                beforeEach(async () => {
                    value = contractDeployer.getWeb3Object().utils.toWei("0.1", 'ether');
                    campaign = await contractDeployer.deployContract(account, [100]);
                    recipient = accounts[1]
                    anotherAccount = accounts[2]
                    await campaign.methods.createRequest(DESCRIPTION_REQUEST, value, recipient).send({ from: account, gas: 1000000 });
                });
                it(`when an user with account which not approves previously is a contributor can approve it `, async() => {
                    await campaign.methods.approveRequest(0).send({ from: accounts[1].toLowerCase(), gas: 1000000 });
                    const request = await campaign.methods.requests(0).call();
                    expect(request.approvalCount).to.eq("1");
                    expect(request.approvals[account[1]]).to.be.true
                })
            })
        })

    })



})
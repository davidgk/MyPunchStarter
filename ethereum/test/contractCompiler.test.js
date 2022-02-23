
const {expect} = require("chai");
const fse = require("fs-extra");
const {buildContracts} = require("../config/contractCompiler");

describe ('ContractCompiler tests', () => {
    describe('#buildContracts', () =>{
        describe('When we have some contracts into a file', () =>{
            const BUILD_PATH = "./buildContract";
            beforeEach(() => {
                removeBuildFolder(BUILD_PATH);
            })
            afterEach(() => {
                removeBuildFolder(BUILD_PATH);
            })
            it('we can print them into a file into the build folder', async () => {
                let buildExists = await fse.exists(BUILD_PATH);
                expect(buildExists).to.be.false;
                await buildContracts();
                buildExists = await fse.exists(BUILD_PATH);
                expect(buildExists).to.be.true;
                expect(await fse.exists(BUILD_PATH + "/CampaignFactory.json")).to.be.true;
                expect(await fse.exists(BUILD_PATH + "/MyPunchStarter.json")).to.be.true;
            })
        })
    })
})

function removeBuildFolder(buildFolderPath) {
    if (fse.exists(buildFolderPath)) {
        fse.remove(buildFolderPath)
    }
}
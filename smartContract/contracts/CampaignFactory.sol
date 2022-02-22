// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./MyPunchStarter.sol";

contract CampaignFactory {
    address public manager;
    address[] public deployedCampaigns;

    constructor() {
        manager = msg.sender;
    }

    function createCampaign(uint minimunContribution) public {
        MyPunchStarter campaign = new MyPunchStarter(minimunContribution, msg.sender);
        deployedCampaigns.push(address(campaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyPunchStarter {
    address public manager;
    uint public minimumContribution;
    uint public lastContribution;
    address[] public  approvers;

    constructor ( uint8 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function getApprovers() public view returns (address[] memory){
        return approvers;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        lastContribution = msg.value;
        approvers.push(msg.sender);
    }
}
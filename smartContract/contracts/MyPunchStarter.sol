// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
}

contract MyPunchStarter {
    Request[] public requests;
    uint numRequests;
    address public manager;
    uint public minimumContribution;
    uint public lastContribution;
    mapping(address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor ( uint8 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        lastContribution = msg.value;
        approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest() public view {}
}
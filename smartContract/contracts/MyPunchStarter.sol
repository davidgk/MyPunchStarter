// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
}

contract MyPunchStarter {
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    uint public lastContribution;
    address[] public  approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

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

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });
        requests.push(newRequest);
    }
}
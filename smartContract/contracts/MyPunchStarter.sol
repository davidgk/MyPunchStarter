// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


contract MyPunchStarter {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        uint numApprovals;
        mapping(address => bool) approvals;
    }

    uint numRequests;
    mapping(uint => Request) public requests;
    address public manager;
    uint public minimumContribution;
    uint public lastContribution;
    mapping(address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor ( uint minimum) payable{
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        lastContribution = msg.value;
        approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted payable {
        Request storage newRequest = requests[numRequests];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvals[manager] = false;
        numRequests++;
    }

    function balance() public view returns (uint){
        return address(this).balance;
    }


    function approveRequest(uint requestIndex) public  {
        Request storage request = requests[requestIndex];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }
}
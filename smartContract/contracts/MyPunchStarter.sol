// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract CampaignFactory {
    address public manager;
    address[] public deployedCampaigns;

    constructor() {
        manager = msg.sender;
    }

    function createCampaign(uint minimunContribution) public {
        MyPunchStarter storage campaign = MyPunchStarter(minimunContribution);
        deployedCampaigns.push(campaign);
    }
}

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
    uint public approversCount;

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
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted payable {
        Request storage newRequest = requests[numRequests];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.numApprovals = 0;
        newRequest.approvals[manager] = false;
        numRequests++;
    }

    function balance() public view returns (uint){
        return address(this).balance;
    }


    function existsApproversForRequest ()  public view returns (bool)  {
        return (approversCount > 0);
    }

    function enoughApproversForRequest (uint requestIndex)  public view returns (bool)  {
        require(existsApproversForRequest());
        Request storage request = requests[requestIndex];
        return (request.numApprovals > (approversCount/2));

    }

    function finalizeRequest(uint requestIndex) public restricted  {
        Request storage request = requests[requestIndex];
        require(!request.complete);
        require(enoughApproversForRequest(requestIndex));
        request.complete = true;
        address payable recipient = payable(request.recipient);
        recipient.transfer(request.value);

    }

    function approveRequest(uint requestIndex) public  {
        require(approvers[msg.sender]);
        Request storage request = requests[requestIndex];
        require(!request.approvals[msg.sender]);
        request.numApprovals++;
        request.approvals[msg.sender] = true;
    }
}
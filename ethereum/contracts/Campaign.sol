pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        // passes in msg.sender as well
        // to allows the Campaign contract to have access to msg.sender
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

// if there is an event that requires the array to be looped
// mapping should be used instead
// O(n) --> O(1), which can save tremendous amount of gas

// mapping facts:
// same as hash table in other languages
// key is not stored, but the key value is hashed to a number
// that is used as an index of the map
// cannot iterate through
// if you put in a key that does not have custom value
// it will return default value of the data type (ex: "" for string, 0 for integer, etc...)

// since mapping is a reference type, if it is declared as a field in a struct
// it does not need to be initialized

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    // in a campaign, the manager address should be accessible
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string description, 
        uint value, 
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        // alternative syntax
        // Request(description, value, recipient, false);
        // not recommended, as the programmer can mess up the order of the properties

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        // local variable of requests[index]
        // declared as storage to allow modification to the data in storage
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}

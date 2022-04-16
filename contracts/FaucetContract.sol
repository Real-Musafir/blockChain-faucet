// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

    uint public numOfFunders;
    address public owner;

    mapping(address=> bool) private funders;
    mapping(uint=> address) private lutFunders;

    constructor (){
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function"
        );
        _;
    }

    modifier limitWithdraw (uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot witdraw more than 0.1 ether"
        );
        _;
    }
    
    //this is a special function
    //it's called when you make a tx that doesn't specify
    // function name to call
    receive() external payable {}

    function addFunds() external payable {
       
        address funder = msg.sender;

        if(!funders[funder]){
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index]=funder;
            
        }
    }

    function test1() external onlyOwner {
        //some managing stuff that only admin should have access to
    }

     function test2() external onlyOwner {
        //some managing stuff that only admin should have access to
    }


    function withdraw(uint withdrawAmount) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }
  
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders); // Array size created by numOfFunders

        for(uint i = 0; i<numOfFunders; i++){
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        
        return lutFunders[index];
    }
    
}

//Block info
//Nonce -a hash that when combined with the minHash proofs that
// the  block has gone through of work(POW)
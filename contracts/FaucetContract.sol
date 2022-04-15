// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

    uint public numOfFunders;
    mapping(uint=> address) private funders;
    
    //this is a special function
    //it's called when you make a tx that doesn't specify
    // function name to call
    receive() external payable {}

    function addFunds() external payable {
        uint index = numOfFunders++;
       funders[index] = msg.sender;
    }
  
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders); // Array size created by numOfFunders

        for(uint i = 0; i<numOfFunders; i++){
            _funders[i] = funders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        
        return funders[index];
    }
    
}

//Block info
//Nonce -a hash that when combined with the minHash proofs that
// the  block has gone through of work(POW)
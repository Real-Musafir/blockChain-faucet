// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {

    address[] public funders;
    
    //this is a special function
    //it's called when you make a tx that doesn't specify
    // function name to call
    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getAllFunders() public view returns (address[] memory){
        return funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        address[] memory _funders = getAllFunders();
        return _funders[index];
    }
    
}

//Block info
//Nonce -a hash that when combined with the minHash proofs that
// the  block has gone through of work(POW)
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// they cannot inherit frokm other smart contract
// they can only inherit from other interfaces
// They cannot declar a constractor
// they cannot declare state variables
// all declared functions have to be external


interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}
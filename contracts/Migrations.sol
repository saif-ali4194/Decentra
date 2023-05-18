// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Migrations {
  address public owner;
  uint256 public lastCompletedMigration;

  constructor() {
    owner = msg.sender;
  }

  function setCompleted(uint256 completed) external {
    require(msg.sender == owner, "Only the contract owner can call this function.");
    lastCompletedMigration = completed;
  }
}
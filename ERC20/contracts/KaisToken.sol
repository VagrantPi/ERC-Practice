//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KaisToken is ERC20 {
    uint256 public INITIAL_SUPPLY = 10000000000000000000000000000000000000;

    constructor() ERC20("KaisToken", "KST") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
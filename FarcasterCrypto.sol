// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FarcasterCrypto is Ownable {
    using Strings for uint256;

    string[] private cryptocurrencies = [
        "Bitcoin",
        "Ethereum",
        "Binance Coin",
        "Cardano",
        "Polkadot",
        "Solana",
        "Avalanche",
        "Dogecoin",
        "Shiba Inu",
        "Litecoin"
    ];

    mapping(address => uint256) private userCrypto;

    constructor(address initialOwner) Ownable(0x22e1217980eA253ba8F190176A0FF7a7ba889091) {
        transferOwnership(initialOwner);
    }

    function getRandomCrypto(address user) public onlyOwner returns (string memory) {
        if (userCrypto[user] == 0) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(user, block.timestamp))) % cryptocurrencies.length;
            userCrypto[user] = randomIndex + 1;
        }
        return cryptocurrencies[userCrypto[user] - 1];
    }
}

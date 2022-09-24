const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Mates.", function(){
    async function deployContracts(){
        const [account1, account2 ]= await ethers.getSigners()
        return { account1, account2 }
    }
    it('Test Buy Packages', async function(){
        const { account1, account2 } = await loadFixture(deployContracts)

    });
});
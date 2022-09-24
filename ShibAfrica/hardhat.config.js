require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks:{
    dev:{
      url:'http://127.0.0.1:7545',
      chainId:1337,
      gas: 10000000
    },
    testnet: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 8000000000,
      gas: 60000000000,
      timeout:100000,
      accounts: {mnemonic: 'real foil witness kite jar chapter weapon mule hard sure win squeeze'}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      gas: 6000000,
      accounts: {mnemonic: 'real foil witness kite jar chapter weapon mule hard sure win squeeze'}
    }
  },
  solidity:{
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.6",
        settings: {},
      },
      {
        version:"0.5.16",
        settings:{}
      },
    ],
  }
};

const hre = require("hardhat");

async function main() {
  
  const [user] = await hre.ethers.getSigners();
  //CONTROLLARE GLI INDIRIZZI
  //ORA SIAMO SU BSCTESTNET
  const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  const Token = await hre.ethers.getContractFactory('Token1')
  const Factory = await hre.ethers.getContractFactory('PancakeFactory')
  const Router = await hre.ethers.getContractFactory('PancakeRouter')
  const token = await Token.deploy({gasLimit:900000});
  await token.deployed()
  console.log(token.address)
  const factory = await Factory.deploy(user.address,{gasLimit:900000});
  await factory.deployed()
  console.log(factory.address)
  const router = await Router.deploy(factory.address, WBNB,{gasLimit:900000});
  await router.deployed()
  console.log(router.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const hre = require("hardhat");

async function main() {
  
  const [user] = await hre.ethers.getSigners();

  const Shibafrica = await hre.ethers.getContractFactory('ShibAfrica');
  const shibafrica = await Shibafrica.deploy(user.address, user.address,{gasLimit:60000});
  await shibafrica.deployed();
  console.log(shibafrica.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

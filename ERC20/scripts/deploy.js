async function main() {
   // Grab the contract factory 
   const KaisToken = await ethers.getContractFactory("KaisToken");

   // Start deployment, returning a promise that resolves to a contract object
   const myToken = await KaisToken.deploy(); // Instance of the contract 
   console.log("Contract deployed to address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
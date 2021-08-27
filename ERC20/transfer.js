require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY_0 = process.env.PUBLIC_KEY_0;
const PUBLIC_KEY_1 = process.env.PUBLIC_KEY_1;
const PRIVATE_KEY_0 = process.env.PRIVATE_KEY_0;


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("./artifacts/contracts/KaisToken.sol/KaisToken.json");
const contractAddress = "0xd9f748844d3c896A1C2E0Ba436Bc1FE777cBFe04";
const tokenContract = new web3.eth.Contract(contract.abi, contractAddress);

async function transfer() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY_0, 'latest'); //get latest nonce
  //the transaction
  const tx = {
    'from': PUBLIC_KEY_0,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': tokenContract.methods.transfer(PUBLIC_KEY_1, 20).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY_0);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}

async function main() {
  await transfer()
}
main();
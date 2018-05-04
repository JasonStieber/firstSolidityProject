const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require ('./compile');

const provider = new HDWalletProvider(
  'elder job pulse adjust health spirit ritual noodle genre like indoor believe',
  'https://rinkeby.infura.io/RnOwD7UmEQ4heGIvCFgu'
);
const web3 = new Web3(provider);


// we created this function so we could use the async syntacs
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from accout ' + accounts[0]);

  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy( {data: '0x' + bytecode, arguments: ['I am Batman'] })
    .send({
      gas: '1000000',
      casPrice: web3.utils.toWei('2', 'gwei'),
      from: accounts[0]} );

  console.log('Contract deployed to ' + results.options.address);
};
deploy();

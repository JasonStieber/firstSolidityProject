const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

const INITIAL_STRING = "Hi there Batman";

/*
class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}
let car;
beforeEach( () => {
  car = new Car();
})

describe('does the Car class work?', () => {
  it('does the park function work?', () =>{
    assert.equal(car.park(), 'stopped');
  });
  it('it can drive', () => {
    assert.equal(car.drive(), 'vroom');
  })
});
*/
let accounts;
let inbox;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of those accoutn to deploy the contract
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there Batman']})
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox tests', () => {
  it('does our contract deploy?', () => {
    assert.ok(inbox.options.address);
  });

  it('it has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal( message, INITIAL_STRING );
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('new message').send({ from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'new message')
  });
})

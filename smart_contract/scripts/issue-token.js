// const TokenFarm = artifacts.require('TokenFarm')

// module.exports = async function(callback) {
//   let tokenFarm = await TokenFarm.deployed()
//   await tokenFarm.issueTokens()
//   // Code goes here...
//   console.log("Tokens issued!")
//   callback()
// }

const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function (callback) {
  try {
    // Deploy DaiToken contract
    const daiToken = await DaiToken.deployed();
    console.log('DaiToken contract address:', daiToken.address);

    // Deploy TokenFarm contract
    const tokenFarm = await TokenFarm.deployed();
    console.log('TokenFarm contract address:', tokenFarm.address);

    // Now that both contracts are deployed, issue tokens
    await tokenFarm.issueTokens();

    console.log('Tokens issued!');
    callback();
  } catch (error) {
    console.error('Error in issue-token.js:', error);
    callback(error);
  }
};

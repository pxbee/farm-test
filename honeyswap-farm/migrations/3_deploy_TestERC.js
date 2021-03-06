const TestERC20 = artifacts.require('./mocks/TestERC20.sol')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TestERC20)
};
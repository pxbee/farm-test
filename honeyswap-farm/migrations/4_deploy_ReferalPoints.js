const ReferalPoints = artifacts.require('./mocks/ReferralPoints.sol')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(ReferalPoints)
};
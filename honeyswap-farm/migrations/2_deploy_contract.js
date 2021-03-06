const HSFToken = artifacts.require('./HSFToken.sol')
const HoneyFarm = artifacts.require('./HoneyFarm.sol')

const { time, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')

const {
  bnPerc,
  ether,
  getTxNonce,
  getDetAddr,
  ZERO,
  trackBalance,
  expectEqualWithinFraction
} = require('../test/utils')

/*
this.farmToken = await HSFToken.new({ from: admin1 })

this.SCALE = ether('1')
this.totalTime = time.duration.years(1)
this.startDelta = time.duration.weeks(1)
this.totalDist = bnPerc(await this.farmToken.totalSupply(), '50')
this.endDistFrac = '20'
const currentTime = await time.latest()

const nonce = await getTxNonce(this.farmToken.transactionHash)
const farmAddr = getDetAddr(admin1, nonce + 2)
await this.farmToken.approve(farmAddr, this.totalDist, { from: admin1 })

this.farm = await HoneyFarm.new(
    this.farmToken.address,
    this.totalDist,
    currentTime.add(this.startDelta),
    currentTime.add(this.startDelta).add(this.totalTime),
    bnPerc(this.SCALE, this.endDistFrac),
    this.totalTime,
    bnPerc(this.SCALE, '2').div(time.duration.weeks(4)),
    this.SCALE,
    { from: admin1 }
)
 */

const Migrations = artifacts.require("Migrations");
module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(HSFToken).then(async comp => {
    const adapter = Migrations.interfaceAdapter;

    const web3 = adapter.web3;


    //console.log( web3.eth.accounts );
    //console.log(comp);
    const SCALE = ether('1')
    const totalTime = time.duration.years(1)
    const startDelta = time.duration.weeks(1)
    const totalDist = bnPerc(await comp.totalSupply(), '50')
    const endDistFrac = '20'
    const currentTime = await time.latest()

    //console.log(comp.transactionHash);
    //console.log(comp.transactionHash);
    //console.log(await getTxNonce(comp.transactionHash));
    const tx = await web3.eth.getTransaction(comp.transactionHash)
    const nonce =  tx.nonce

    const [admin1] = accounts

    const farmAddr = getDetAddr(admin1, nonce + 2)

    await comp.approve(farmAddr, totalDist, { from: admin1 })

    // const nonce = await getTxNonce(comp.transactionHash)


    //const farmAddr = getDetAddr(admin1, nonce + 2)


    //console.log(comp);
    //console.log(currentTime);
    //console.log(time);
    await deployer.deploy(
        HoneyFarm,
        comp.address,
        totalDist,
        currentTime.add(startDelta),
        currentTime.add(startDelta).add(totalTime),
        bnPerc(SCALE, endDistFrac),
        totalTime,
        bnPerc(SCALE, '2').div(time.duration.weeks(4)),
        SCALE
        );
  })

}

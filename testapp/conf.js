const Web3 = require('web3');
const BN = require('bn.js')
const HoneyFarm = require("./contracts/HoneyFarm.json");
const TestERC = require("./contracts/TestERC20.json");
const ReferalPoints = require('./contracts/ReferralPoints.json');
const cl = (...c) => console.log(c);

let web3 = new Web3(Web3.givenProvider || "ws://0.0.0.0:8545");



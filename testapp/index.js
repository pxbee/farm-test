const Web3 = require('web3');
const BN = require('bn.js')
const HoneyFarm = require("./contracts/HoneyFarm.json");
const TestERC = require("./contracts/TestERC20.json");
const ReferalPoints = require('./contracts/ReferralPoints.json');
const cl = (...c) => console.log(c);

let web3 = new Web3(Web3.givenProvider || "ws://0.0.0.0:8545");

let admin =  web3.eth.accounts.privateKeyToAccount('0x695d4e54cc82104b4d44dcb108d978dc0f57f166ef463c1a57836b684355d663');
let honeyFarm = new web3.eth.Contract(HoneyFarm.abi, '0xBaFFd4Dc040F96aAc85cEe0aa847D42e85B4F131');
let testERC = new web3.eth.Contract(TestERC.abi, '0xE15Af7E5E2fd22E800F80FE7D8971D5713dB3301');
let referalPoints = new web3.eth.Contract(ReferalPoints.abi, '0xc18ee1196E8228bd4473380A87912917EaE4179A');


web3.eth.defaultAccount = admin.address;
cl('admin', admin.address);

cl('honeyFarm.options.address', honeyFarm.options.address);
cl('referalPoints.options.address', referalPoints.options.address);

/*
referalPoints.methods.owner().call().then( (...rpowner) => {
    cl(rpowner);
} );

referalPoints.methods.owner().send({from: admin.address}).then( (...rpowner) => {
    cl(rpowner);
} );
*/

/*
referalPoints.methods.transferOwnership(honeyFarm.options.address)
    .send({from: admin.address})
    .then((...ref) => {
        cl('referalPoints.methods.transferOwnership', ref);
        //cl('honeyFarm.options.address', honeyFarm.options.address)
        referalPoints.methods.owner().call().then( (...rpo) => {
            cl('referalPoints.methods.owner()', rpo);
        });

    });

*/

referalPoints.methods.transferOwnership(honeyFarm.options.address)
    .send({from: admin.address})
    .then((...ref) => {

    });

honeyFarm.methods.setReferralPoints(referalPoints.options.address).send({from: admin.address}).then( (...bb) => {
    //const allocPoints = new BN('20')
    //honeyFarm.methods.add(allocPoints, testERC.options.address, true).send({from: admin.address}).then(cl);

    const allocPoints = new BN('20')
    honeyFarm.methods.add(allocPoints, testERC.options.address, true)
        //.estimateGas({from: admin.address})
        .send({
            from: admin.address,
            gas: 170000
        })
        .then(cl);
});


/*
const allocPoints = new BN('20')
honeyFarm.methods.add(allocPoints, testERC.options.address, true)
    //.estimateGas({from: admin.address})
    .send({
        from: admin.address,
        gas: 170000
    })
    .then(cl);
    //.then(cl);

 */


//honeyFarm.methods.owner().call().then(cl);
//honeyFarm.methods.setReferralPoints(referalPoints.options.address).call().then(cl);

//await this.farm.setReferralPoints(this.referralPoints.address, { from: admin1 })

//cl('test');
//cl(testERC.options.address);
//honeyFarm.methods.add(allocPoints, testERC.options.address, true).call({from: web3.eth.defaultAccount}).then(cl);


//await honeyFarm.methods.name().call().then(cl);

/* await this.farm.add(allocPoints, testERC.address, true, {
    from: admin1
})*/

//getContract(ifoAbi, address, web3)


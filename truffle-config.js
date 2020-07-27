const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = "hero spirit buddy copy slam glimpse tube soup senior cat hollow bronze";

module.exports = {
   
  contracts_build_directory: path.join(__dirname, "/src/contracts"),
    networks: {
      development: {
        port: 9545,
        host:"127.0.0.1",
        network_id:"*"
      },
      ropsten: {
        provider: function() {
          return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/b722162e84334277a6b60a2f5d923fde")
        },
        network_id: 3,
        gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
      }
    },
    compilers:{
      solc:{
        version:"0.4.24"
      }
    }
  };
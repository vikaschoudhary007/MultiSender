import React, { Component } from "react";
import './App.css';
import Index3 from "./pages/Index3/Index3"
import getWeb3 from "./getWeb3";
import MultiSenderContract from "./contracts/MultiSender.json"
import Web3 from "web3";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {web3: null, accounts: null, MultiSender: null, loaded:false, walletConnected: false};
  }

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
      
  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = MultiSenderContract.networks[networkId];
  //     const MultiSender = new web3.eth.Contract(
  //       MultiSenderContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );
     
  //     this.setState({web3, accounts, MultiSender, loaded:true, walletConnected:true });
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

    handleConnectWallet = async () => {
      
     const {ethereum } = window;

     if(!ethereum){
       throw new Error("Web3 not found");
     }

     const web3 = new Web3(ethereum);
     await ethereum.enable();

     

    const accounts = await web3.eth.getAccounts();

     const networkId = await web3.eth.net.getId();
      const deployedNetwork = MultiSenderContract.networks[networkId];
      const MultiSender = new web3.eth.Contract(
        MultiSenderContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({web3,accounts, MultiSender, loaded:true, walletConnected:true });

    }

    render() {
      if (!this.state.loaded) {
       
        return(
          <Index3 walletConnected={this.state.walletConnected} handleConnectWallet = {this.handleConnectWallet}/>
        )
      }
        return (
          <React.Fragment>
            <Index3 
              account = {this.state.accounts[0]} 
              multiSender = {this.state.MultiSender} 
              web3 = {this.state.web3} 
              walletConnected = {this.state.walletConnected}
              
              />
        </React.Fragment>
      );
    }
}
  
  export default App;
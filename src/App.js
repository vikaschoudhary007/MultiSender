import React, { Component } from "react";
import './App.css';
import routes from "./routes";
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import Index3 from "./pages/Index3/Index3"
import getWeb3 from "./getWeb3";
import MultiSenderContract from "./contracts/MultiSender.json"


class App extends Component {
  constructor(props){
    super(props);
    this.state = {loaded:false};
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
      
      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.deployedNetwork = MultiSenderContract.networks[this.networkId];
      this.MultiSender = new this.web3.eth.Contract(
        MultiSenderContract.abi,
        this.deployedNetwork && this.deployedNetwork.address,
      );
     
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };



    render() {
      if (!this.state.loaded) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
        return (
          <React.Fragment>
          {/* <Router>
            <Switch>
              {routes.map((route, idx) => (
                <Route path={route.path} component={route.component} key={idx}/>
              ))}
              <Route path="/" component={Index3}/>
            </Switch>
          </Router> */}
          <Index3 account = {this.accounts[0]} multiSender = {this.MultiSender} web3 = {this.web3}/>
        </React.Fragment>
      );
    }
}
  
  export default withRouter(App);
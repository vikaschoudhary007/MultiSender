import React, { useState, Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import swal from "sweetalert";
import generateElement from "../../generateElement";
import web3 from "web3";
import payzusABI from "../../contracts/PayzusABI.json";
import firebaseApp from "../../firebase-config";

const database = firebaseApp.database().ref("MultiSender");

class ModalExample extends Component {
  constructor(props){
      super(props);
      this.state = {
          modal:false,
          nestedModal:false,
          closeAll:false,
          amount:"",
          address:""
      }
  }

    toggle = () => this.setState({modal: !this.state.modal});

    toggleNested = () => {
        this.setState({nestedModal: !this.state.nestedModal, closeAll:false})
    } 

    toggleAll = () => {
        this.setState({nestedModal: !this.state.nestedModal, closeAll:true})
    }


    registerVIP = async () => {

        if(!this.props.walletConnected){
            swal({
                content: generateElement(`Connect to wallet first`),
                icon: "error",
            })
            return 
        }

        else {
            var isVip = await this.props.Contract.methods.isVIP(this.props.account).call();

            if(isVip){
                swal({
                    content: generateElement(`This Account is already a VIP`),
                    icon: "error",
                })
                return
            }

            else{
                const result = await this.props.Contract.methods.registerVIP().send({from:this.props.account, value:"1000000000000000000"});
                
                swal({
                    content: generateElement(`Congratulation you are a VIP now`),
                    icon: "success",
                })
            }
        }

        
    }

    updatingDataBase = async () => {
        await database
            .child(this.props.account)
            .set({isVip:false, paid:true})
    }

    registerVIPWithPayzus = async () => {

        if(!this.props.walletConnected){
            swal({
                content: generateElement(`Connect to wallet first`),
                icon: "error",
            })
            return 
        }

        else{

            var isVip = await this.props.Contract.methods.isVIP(this.props.account).call();
            console.log(isVip);

            if(isVip){
                swal({
                    content: generateElement(`This Account is already a VIP`),
                    icon: "error",
                })
                return
            }

            else{
                const Web3 = new web3(web3.givenProvider);
                console.log(Web3)
                const PayzusContract = new Web3.eth.Contract(payzusABI,"0x1F28ECA92cE85d9BC2AEa738Db63bfDd0A6F6fAa");
                console.log(PayzusContract);

                const result = await PayzusContract.methods.transfer("0xad7b72b4F775C24fD31a921490248A4Ea382E7fA","500000000000000000000").send({from:this.props.account});
                console.log(result)
                swal({
                    content: generateElement(`Your application is submitted successfuly.Please wait for a while`),
                    icon: "info",
                })
                this.updatingDataBase();
            }

        }

    }

  render() {

    return (
        <div>
            {
                !this.props.walletConnected 
                ? (
                    <Button color="danger" onClick={this.toggle} style={{marginRight:"10px"}}>VIP</Button>
                )
                :
                (
                    <Button color="danger" onClick={this.toggle}>VIP</Button>
                )
            }
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} style={{top:"20%"}}>
            <ModalHeader toggle={this.toggle}>Wanna be A VIP</ModalHeader>
            <ModalBody>
                
                <h3>Get lifetime free access with Special offer available with only PZS .</h3>
                <h5>Simply choose how you want to pay, with ETH or PZS</h5>
                
                {/* <AvForm name="contact-form" id="contact-form">
                    <Row>
                        <Col lg="12">
                            <AvField type="text" className="form-group mt-2" name="amount" id="amount" placeholder="Enter Amount" 
                                value={this.state.amount}
                                onChange = {(event) => this.setState({amount: event.target.value})}
                            />
                        </Col>  
                    </Row>
                    <Row>
                        <Col lg="12">
                            <AvField type="text" className="form-group mt-2" name="amount" id="amount" placeholder="Enter Address" 
                                value={this.state.address}
                                onChange = {(event) => this.setState({address: event.target.value})}
                            />
                        </Col>
                    </Row>
                                            
                </AvForm>             */}
              <br />
              <Button color="primary" onClick={this.toggleNested}>Why VIP ?</Button>
              <Button color="primary" onClick={this.registerVIPWithPayzus} style={{float:"right",marginLeft:"10px"}}>With PZS</Button>
              <Button color="primary" onClick={this.registerVIP} style={{float:"right"}}>With ETH</Button>

              

              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined} style={{top:"10%"}}>

                <ModalHeader>What is a VIP ??</ModalHeader>
                <ModalBody>
                    <h4>VIP give you the acces to Enjoy multisender for lifetime without any Extra transaction fee on our Platform.</h4>
                    <h5>You can be a VIP by paying 1 ETH or 500 PZS</h5>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>Cool</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAll}>Exit</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
              {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
            </ModalFooter>
          </Modal>
        </div>
      );
  }

  
}

export default ModalExample;
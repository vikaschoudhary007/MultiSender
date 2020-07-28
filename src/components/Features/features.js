import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ReactFileReader from "react-file-reader";
import web3 from "web3";
import ERC20Abi from "../../contracts/ERC20ABI.json";


export default function Features(props) {

    const [etherAddresses, setEtherAddresses] = useState([]);
    const [etherBalances, setEtherBalances] = useState([]);
    const [totalEtherAmount, setTotalEtherAmount] = useState("");

    const [ERC20Address, setERC20Address] = useState("");
    const [tokenAddresses, setTokenAddresses] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([])
    const [decimal,setDecimal] = useState(18);
    
    const uploadCsvForEther = (files) => {

        setEtherAddresses([]);
        setEtherBalances([])

        var reader = new FileReader();
        reader.onload = function(e) {

            let lines = reader.result.split('\n');

            lines.forEach(element => {
                var temp = element.split(",");
                etherAddresses.push(temp[0]);
                etherBalances.push((temp[1]*1000000000000000000).toString());              
            });
            console.log(etherAddresses);
            console.log(etherBalances)
            setEtherAddresses(etherAddresses);
            setEtherBalances(etherBalances);    
        }
        reader.readAsText(files[0]);
    }

    const uploadCsvForToken = (files) => {

        setTokenAddresses([]);
        setTokenBalances([])

        var reader = new FileReader();
        reader.onload = function(e) {

            let lines = reader.result.split('\n');

            lines.forEach(element => {
                var temp = element.split(",");
                tokenAddresses.push(temp[0]);
                tokenBalances.push((temp[1]*1000000000000000000).toString());              
            });
            console.log(tokenAddresses);
            console.log(tokenBalances)
            setTokenAddresses(tokenAddresses);
            setTokenBalances(tokenBalances);    
        }
        reader.readAsText(files[0]);
    }

    const initialize = async() => {
        const Web3 = new web3(web3.givenProvider);
        const accounts = await Web3.eth.getAccounts();
        console.log(accounts)

        const tokenContract = new Web3.eth.Contract(ERC20Abi,ERC20Address)

        console.log(tokenContract);

        const result = await tokenContract.methods.approve("0xf6f7ba71a1EA85CE09063180E6F6919C50EE1056","1000000000000000000000").send({from:props.account});
        console.log(result)

    }


    const sendEther = async()  => {
      
        const result = await props.multiSender.methods.mutiSendETHWithDifferentValue(
           etherAddresses,
           etherBalances
            ).send({from: props.account, value:web3.utils.toWei(totalEtherAmount, 'ether')})
        
        console.log(result)       
    }

    const sendToken = async() => {
        console.log(ERC20Address)
       
        const result = await props.multiSender.methods.mutiSendCoinWithDifferentValue(
            ERC20Address,
            tokenAddresses,
            tokenBalances
            ).send({from: props.account, value:web3.utils.toWei('0.11', "ether")});

        console.log(result)
    }

        return (
            <React.Fragment>
                <section className="section" id="features">
                {/* <div style={{textAlign:"center"}}><h2>USE MULTISENDER</h2></div> */}
                    <Container>  
                    
                        <Row className="align-items-center">
                            <Col lg="5" className="order-2 order-lg-1">
                                <div ><h2>Transfer Ether</h2></div>
                                <div className="features-box mt-5 mt-lg-0">
                                <div className="custom-form mt-4 pt-4">
                                    <div id="message"></div>
                                    <AvForm name="contact-form" id="contact-form">
                                        <Row>
                                            <Col lg="6">
                                                <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Total Amount in ETH*" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "This field is mandatory"},
                                                      }}
                                                      value={totalEtherAmount}
                                                      onChange={(event) => setTotalEtherAmount(event.target.value)}
                                                />
                                               
                                            </Col>
                                            {/* <Col lg="6">
                                                <AvField type="text" className="form-group mt-2" name="email" id="email" placeholder="Decimal*" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Enter Decimal"},
                                                    }}
                                                    value={decimal}
                                                    onChange={(event) => setDecimal(event.target.value)}
                                                />
                                            </Col>                                 */}
                                        </Row>
                                        {/* <Row>
                                            <Col lg="12">
                                                <AvField type="text" className="form-group mt-2" name="subject" id="subject"placeholder="Your Subject.." required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Please enter your topic'},
                                                        pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'topic is invalid!'},
                                                    }}
                                                />
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <Col lg="12">
                                                <div className="form-group mt-2">
                                                    <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"></textarea>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" className="text-left">
                                                <ReactFileReader fileTypes={".csv"} multipleFiles={false} handleFiles={uploadCsvForEther}>
                                                    <button  className="submitBnt btn btn-custom">Upload CSV file </button>
                                                    <div id="simple-msg"></div>
                                                </ReactFileReader>
                                                
                                            </Col>
                                            <Col lg="6" className="text-right">
                                                <button  className="submitBnt btn btn-custom" onClick={sendEther}>Send <i className="mdi mdi-arrow-right"></i></button>
                                                <div id="simple-msg"></div>
                                            </Col>
                                        </Row>
                                        
                                    </AvForm>
                                    

                                    
                                </div>
                                </div>
                            </Col>

                            <Col lg={{size: 1, order: 3}} xs={{order:2}}></Col>

                            <Col lg={{size: 6, order: 3, }} xs={{order : 3}} className="order-2 order-lg-1">
                                <div ><h2>Transfer Tokens</h2></div>
                                <div className="features-box mt-5 mt-lg-0">
                                    <div className="custom-form mt-4 pt-4">
                                        <AvForm>
                                            <Row>
                                                <Col lg="8">
                                                    <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Token Address*" required
                                                        errorMessage=""
                                                        validate={{
                                                            required: {value: true, errorMessage: "This field is mandatory"},
                                                        }}
                                                        value={ERC20Address}
                                                        onChange={(event) => setERC20Address(event.target.value)}
                                                    />
                                                </Col>
                                                <Col lg="4">
                                                    <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Decimal*" required
                                                        errorMessage=""
                                                        validate={{
                                                            required: {value: true, errorMessage: "This field is mandatory"},
                                                        }}
                                                        value={decimal}
                                                        onChange={(event) => setDecimal(event.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <div className="form-group mt-2">
                                                        <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"></textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4" className="text-left">
                                                    <button  className="submitBnt btn btn-custom" onClick={initialize}>Initialize</button>
                                                    <div id="simple-msg"></div>    
                                                </Col>
                                                <Col lg="4" className="text-center">
                                                    <ReactFileReader fileTypes={".csv"} multipleFiles={false} handleFiles={uploadCsvForToken}>
                                                        <button  className="submitBnt btn btn-custom">Upload CSV file </button>
                                                        <div id="simple-msg"></div>
                                                    </ReactFileReader>                                                  
                                                </Col>
                                                <Col lg="4" className="text-right">
                                                    <button  className="submitBnt btn btn-custom" onClick={sendToken}>Send <i className="mdi mdi-arrow-right"></i></button>
                                                    <div id="simple-msg"></div>
                                                </Col>
                                            </Row>
                                        </AvForm>
                                    </div>
                                </div>
                                 {/* <div className="features-img mx-auto mr-lg-0">
                                    <img src="assets/images/growth-analytics.svg" alt="macbook" className="img-fluid" />
                                </div> */}
                                
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    // }
}


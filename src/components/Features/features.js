import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ReactFileReader from "react-file-reader";
import getWeb3 from "../../getWeb3";
import web3 from "web3";

var abi = require('human-standard-token-abi');

export default function Features(props) {

    const [addresses, setAddresses] = useState([]);
    const [balances, setBalances] = useState([]);
    const [tokenAddress, setTokenAddress] = useState("");
    const [decimal,setDecimal] = useState(18);
    const [totalAmount, setTotalAmount] = useState("");
    

    const handleFiles = (files) => {

        setAddresses([]);
        setBalances([])

        var reader = new FileReader();
        reader.onload = function(e) {
            // alert(reader.result)

            let lines = reader.result.split('\n');

            lines.forEach(element => {
                var temp = element.split(",");
                addresses.push(temp[0]);
                balances.push(temp[1]);              
        });
            console.log(addresses);
            console.log(balances)
        }

        reader.readAsText(files[0]);
    }

    const handleClick = async()  => {
        console.log(addresses);
        console.log(balances);

    
        const result = await props.multiSender.methods.mutiSendETHWithDifferentValue(
            ["0xad7b72b4F775C24fD31a921490248A4Ea382E7fA","0x435a4787Af28293934161F5e22f4F7368B10D2Af"],
            ["1000000000000000","1000000000000000"]
            ).send({from: props.account, value:web3.utils.toWei(totalAmount, 'ether')})
        
        console.log(result)
        
         
    }

    // const handleInitialize = async() => {
    //     const web3 = await getWeb3();
    //     const tokenContract = new web3.eth.contract();
    //     console.log(tokenContract)
    // }

  
        return (
            <React.Fragment>
                <section className="section" id="features">
                <div style={{textAlign:"center"}}><h2>USE MULTISENDER</h2></div>
                    <Container>  
                    <div ><h2>Transfer Ether</h2></div>
                        <Row className="align-items-center">
                            <Col lg="5" className="order-2 order-lg-1">
                                <div className="features-box mt-5 mt-lg-0">
                                    {/* <h3>Use MultiSender</h3> */}
                                    {/* <p className="text-muted web-desc">Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                    <ul className="text-muted list-unstyled margin-t-30 features-item-list">
                                        <li className="">We put a lot of effort in design.</li>
                                        <li className="">The most important ingredient of successful website.</li>
                                        <li className="">Submit Your Orgnization.</li>
                                    </ul> */}


                                <div className="custom-form mt-4 pt-4">
                                    <div id="message"></div>
                                    <AvForm name="contact-form" id="contact-form">
                                        <Row>
                                            <Col lg="6">
                                                <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Total Amount*" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "This field is mandatory"},
                                                      }}
                                                      value={tokenAddress}
                                                      onChange={(event) => setTotalAmount(event.target.value)}
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
                                                    <textarea name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"></textarea>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12" className="text-left">
                                                <ReactFileReader fileTypes={".csv"} multipleFiles={false} handleFiles={handleFiles}>
                                                    <button  className="submitBnt btn btn-custom">Upload CSV file </button>
                                                    <div id="simple-msg"></div>
                                                </ReactFileReader>
                                                
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12" className="text-right">
                                                <button  className="submitBnt btn btn-custom" onClick={handleClick}>Send <i className="mdi mdi-arrow-right"></i></button>
                                                <div id="simple-msg"></div>
                                            </Col>
                                        </Row>
                                    </AvForm>
                                    

                                    
                                </div>
                                </div>
                            </Col>
                            <Col lg={{size: 7, order: 2, }} xs={{order : 1}}>
                                <div className="features-img mx-auto mr-lg-0">
                                    <img src="assets/images/growth-analytics.svg" alt="macbook" className="img-fluid" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    // }
}


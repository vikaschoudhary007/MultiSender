import React, { Component, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ReactFileReader from "react-file-reader";
import web3 from "web3";
import ERC20Abi from "../../contracts/ERC20ABI.json";
import swal from "sweetalert";
import generateElement from "../../generateElement";

import SectionTitle from "../common/section-title";

export default function Features(props) {

    const [etherAddresses, setEtherAddresses] = useState([]);
    const [etherBalances, setEtherBalances] = useState([]);
    const [totalEtherAmount, setTotalEtherAmount] = useState("");

    const [ERC20Address, setERC20Address] = useState("");
    const [tokenAddresses, setTokenAddresses] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([])
    const [decimal,setDecimal] = useState(18);
    const [initialized, setInitilized] = useState(false);

    const [ShowEtherAddresses, setShowEtherAddresses] = useState([]);
    const [ShowTokenAddresses, setShowTokenAddresses] = useState([]);

    const [loading, setLoading] = useState(false);
  

    const uploadCsvForEther = async (files) => {

        var reader = new FileReader();
     
        reader.onload = function(e) {
            
            setShowEtherAddresses(reader.result);
            var count = 0;
            let lines = reader.result.split('\n');
            console.log(lines)
            lines.forEach(element => {

                if(element !== ""){
                    var temp = element.split(",");
                    etherAddresses.push(temp[0]);
                    etherBalances.push((temp[1]*1000000000000000000).toString());  
                }
                
            });

            
            console.log(count)

            // etherAddresses.forEach(function(item) {
            //     if(item === ""){
            //         etherAddresses.pop(item)
            //     }
            // })

            // etherBalances.forEach(function(item) {
            //     if(isNaN(item)){
            //         etherBalances.pop(item)
            //     }
            // })



            etherBalances.forEach(function(item) {
                count = count + parseFloat(item / (10 ** 18));
            });

            setTotalEtherAmount(count)
            console.log(count);
            console.log(etherAddresses);
            console.log(etherBalances)
            setEtherAddresses(etherAddresses);
            setEtherBalances(etherBalances);  
        }
        reader.readAsText(files[0]);
       
    }

    const uploadCsvForToken = (files) => {

        var reader = new FileReader();
        reader.onload = function(e) {

            setShowTokenAddresses(reader.result);
            let lines = reader.result.split('\n');

            lines.forEach(element => {
                var temp = element.split(",");
                tokenAddresses.push(temp[0]);
                tokenBalances.push((temp[1]*1000000000000000000).toString());              
            });

            // tokenAddresses.pop(0,-1)
            // tokenBalances.pop(0,-1)

            tokenAddresses.forEach(function(item) {
                if(item === ""){
                    tokenAddresses.pop(item)
                }
            })

            tokenBalances.forEach(function(item) {
                if(item === "NaN"){
                    tokenBalances.pop(item)
                }
            })


            console.log(tokenAddresses);
            console.log(tokenBalances)
            setTokenAddresses(tokenAddresses);
            setTokenBalances(tokenBalances);    
        }
        reader.readAsText(files[0]);

    }

    const initialize = async() => {

        if(props.multiSender === undefined){
            swal({
                content: generateElement(`Connect to wallet first`),
                icon: "error",
              })
            return  
        }

        else if(ERC20Address === ""){
            swal({
                content: generateElement(`Please Enter Token Address first`),
                icon: "error",
            })
            return
        }

        else if(initialized === true){
            swal({
                content: generateElement(`This Token is already initilized`),
                icon: "error",
            })
            return
        }

        const Web3 = new web3(web3.givenProvider);
        const accounts = await Web3.eth.getAccounts();
        // console.log(accounts)

        const tokenContract = new Web3.eth.Contract(ERC20Abi,ERC20Address)

        console.log(tokenContract);

        // const decimal = await tokenContract.methods.decimals().call();

        // setDecimal(decimal);

        const result = await tokenContract.methods.approve(
            "0x2A55873CD7dd73ce0F54ea4b1f541928cF765270",
            "1000000000000000000000")
            .send({from:props.account});

        setInitilized(true)    
        // console.log(result)

    }

    // const isVIP = async (value) => {
    //     var result = await props.multiSender.methods.isVIP(value).call()
    //     console.log(result)
    //     return result;
    // }


    const sendEther = async()  => {


        if(props.multiSender === undefined){
            swal({
                content: generateElement(`Connect to wallet first`),
                icon: "error",
              })
              return
        }

        if(totalEtherAmount === ""){
            swal({
                content: generateElement(`Upload CSV first`),
                icon: "error",
              })
              return
        }



        if(etherAddresses.length > 150){
            swal({
                content: generateElement(`Please upload upto 150 Addresses only`),
                icon: "error",
              })
            return
        }

        var isVip = await props.multiSender.methods.isVIP(props.account).call()
        console.log(isVip)

        if(isVip){
            var Amount = (totalEtherAmount).toString(); 
        }

        else {
            var Amount = (totalEtherAmount + 0.01).toString(); 
        }
        

      
        const result = await props.multiSender.methods.mutiSendETHWithDifferentValue(
           etherAddresses,
           etherBalances
            ).send({from: props.account, value:web3.utils.toWei((Amount), 'ether')})
        
        // console.log(result)   

        setTotalEtherAmount("")
        setEtherAddresses([]);
        setEtherBalances([]);
        setShowEtherAddresses([])

    }

    const sendToken = async() => {

        setLoading(true);

        var isVip = await props.multiSender.methods.isVIP(props.account).call()
        console.log(isVip)

        if(isVip){
            var Amount = (0).toString(); 
        }

        else {
            var Amount = (0.01).toString(); 
        }

        if(props.multiSender === undefined){
            swal({
                content: generateElement(`Connect to wallet first`),
                icon: "error",
            })
            return
        }

        else if(ERC20Address === ""){
            swal({
                content: generateElement(`Please Enter Token Address first`),
                icon: "error",
            })
            return
        }

        else if(tokenAddresses === []){
            swal({
                content: generateElement(`Upload CSV file first`),
                icon: "error",
            })
            return
        }

        // console.log(ERC20Address)
       
        const result = await props.multiSender.methods.mutiSendCoinWithDifferentValue(
            ERC20Address,
            tokenAddresses,
            tokenBalances
            ).send({from: props.account, value:web3.utils.toWei(Amount, "ether")});

        setLoading(false);    

        // console.log(result)
        setERC20Address("");
        setTokenAddresses([]);
        setTokenBalances([]);
        setShowTokenAddresses([]);
    }

        return (
            <React.Fragment>
                <section className="section" id="features">
                {/* <div style={{textAlign:"center"}}><h2>USE MULTISENDER</h2></div> */}
                    <Container>  

                    <SectionTitle title="MultiSend Ether" description="Description Here."/>

                        <Row className="align-items-center">
                            <Col lg="5" className="order-2 order-lg-1">
                                <div ><h2>Transfer Ether</h2></div>
                                <div className="features-box mt-5 mt-lg-0">
                                <div className="custom-form mt-4 pt-4">
                                    <div id="message"></div>
                                    <AvForm name="contact-form" id="contact-form">
                                        <Row>
                                            <Col lg="6">
                                                <AvField readOnly="true" type="text" className="form-group mt-2" name="name" id="name" placeholder="Total Amount in ETH*" 
                                                    // errorMessage=""
                                                    // validate={{
                                                    //     required: {value: true, errorMessage: "This field is mandatory"},
                                                    //   }}
                                                      value={totalEtherAmount}
                                                    //   onChange={(event) => setTotalEtherAmount(event.target.value)}
                                                />
                                               
                                            </Col>  
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <div className="form-group mt-2">
                                                    <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"
                                                        value={ShowEtherAddresses}
                                                    >

                                                    </textarea>
                                                    <p>Upload upto 150 Addresses at a time.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" className="text-left">
                                                <ReactFileReader fileTypes={[".csv",".xlsx","xlsm",".xlsb","xltx",".xltm",".xls",".xlt",".xml",".xlam",".xla","xlw",".xlr"]} multipleFiles={false} handleFiles={uploadCsvForEther}>
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
                                                    <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Token Contract Address*" required
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
                                                        <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"
                                                            value={ShowTokenAddresses}
                                                        >

                                                        </textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4" className="text-left">
                                                    <button  className="submitBnt btn btn-custom" onClick={initialize}>Initialize</button>
                                                    <div id="simple-msg"></div>    
                                                </Col>
                                                <Col lg="4" className="text-center">
                                                    <ReactFileReader fileTypes={[".csv",".xlsx","xlsm",".xlsb","xltx",".xltm",".xls",".xlt",".xml",".xlam",".xla","xlw",".xlr"]} multipleFiles={false} handleFiles={uploadCsvForToken}>
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
                                
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    // }
}


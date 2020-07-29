import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

class Section extends Component {
    
    render() {
        return (
            <React.Fragment>
                <section className="section bg-home height-100vh" id="home">
                    <div className="bg-overlay"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container>
                                <Row>
                                    <Col lg={{size : 8, offset : 2}} className="text-white text-center">
                                        <h4 className="home-small-title">MultiSender</h4>
                                        <h1 className="home-title">We supports all networks</h1>
                                        <p className="padding-t-15 home-desc mx-auto">
                                            <span>Ethereum MainNet</span>
                                            <span style={{paddingLeft:10}}>Ropsten</span>
                                            <span style={{paddingLeft:10}}>Rinkby</span>
                                            <span style={{paddingLeft:10}}>Gorli</span>
                                            <span style={{paddingLeft:10}}>Kovan</span>
                                        </p>
                                        <p className="play-shadow margin-t-30 margin-l-r-auto">
                                        </p>   
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;
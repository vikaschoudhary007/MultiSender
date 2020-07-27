import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class WebsiteDescription extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="section bg-web-desc">
                    <div className="bg-overlay"></div>
                    <Container>
                        <Row>
                            <Col lg="12" className="text-center">
                                <h2 className="text-white">Build your dream website today</h2>
                                <p className="padding-t-15 home-desc mx-auto">But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her.</p>
                                <Link to="#" className="btn btn-bg-white margin-t-30 waves-effect waves-light">View Plan & Pricing</Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default WebsiteDescription;
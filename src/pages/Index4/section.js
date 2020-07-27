import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";

class Section extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="section bg-home home-half home-registration" id="home">
                    <div className="bg-overlay"></div>
                    <Container>
                        <Row className="align-items-center">
                            <Col lg="7" className="text-white text-left">
                                <h4 className="home-small-title">Awesome Design</h4>
                                <h1 className="home-title">We love make things amazing and simple</h1>
                                <p className="padding-t-15 home-desc">Maecenas class semper class semper sollicitudin lectus lorem iaculis imperdiet aliquam vehicula tempor auctor curabitur pede aenean ornare.</p>
                                <Link to="#" className="btn btn-custom margin-t-30 waves-effect waves-light">Get Started <i className="mdi mdi-arrow-right"></i></Link>
                            </Col>
                            <Col lg={{size:4, offset:1}} className="mt-5 mt-lg-0">
                                <div className="home-registration-form bg-white">
                                    <h4 className="form-heading text-center mt-2">Get 30 day FREE Trial</h4>
                                    <Form className="registration-form" id="registration-form">
                                        <Input type="text" id="exampleInputName1" className="form-control registration-input-box" placeholder="Name"/>
                                        <Input type="email" id="exampleInputEmail1" className="form-control registration-input-box" placeholder="Email"/>
                                        <textarea className="form-control registration-textarea-box" rows="4" placeholder="Message"></textarea>
                                        <Button className="btn-custom home-btn-width waves-effect waves-light">Send Detail</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;
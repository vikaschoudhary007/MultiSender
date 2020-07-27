import React, { Component } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Section Title
import SectionTitle from "../common/section-title";

class ContactUs extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="section " id="contact">
                    <Container>
                        {/* Render section title */}
                        <SectionTitle title="Get In Touch" description="We thrive when coming up with innovative ideas but also understand that a smart concept should be supported with measurable results."/>

                        <Row>
                            <Col lg="4">
                                <div className="mt-4 pt-4">
                                    <p className="mt-4"><span className="h5">Office Address 1:</span><br/> <span className="text-muted d-block mt-2">4461 Cedar Street Moro, AR 72368</span></p>
                                    <p className="mt-4"><span className="h5">Office Address 2:</span><br/> <span className="text-muted d-block mt-2">2467 Swick Hill Street <br/>New Orleans, LA 70171</span></p>
                                    <p className="mt-4"><span className="h5">Working Hours:</span><br/> <span className="text-muted d-block mt-2">9:00AM To 6:00PM</span></p>
                                </div>
                            </Col>
                            <Col lg="8">
                                <div className="custom-form mt-4 pt-4">
                                    <div id="message"></div>
                                    <AvForm name="contact-form" id="contact-form">
                                        <Row>
                                            <Col lg="6">
                                                <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Your name*" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Please enter your name'},
                                                      }}
                                                />
                                            </Col>
                                            <Col lg="6">
                                                <AvField type="email" className="form-group mt-2" name="email" id="email" placeholder="Your email*" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter your email"},
                                                    }}
                                                />
                                            </Col>                                
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <AvField type="text" className="form-group mt-2" name="subject" id="subject"placeholder="Your Subject.." required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: 'Please enter your topic'},
                                                        pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'topic is invalid!'},
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <div className="form-group mt-2">
                                                    <textarea name="comments" id="comments"  rows="4" className="form-control" placeholder="Your message..."></textarea>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12" className="text-right">
                                                <Button  className="submitBnt btn btn-custom">Send Message</Button>
                                                <div id="simple-msg"></div>
                                            </Col>
                                        </Row>
                                    </AvForm>
                                </div>  
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default ContactUs;
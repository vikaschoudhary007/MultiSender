import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Label } from "reactstrap";
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

//Import Home Button
import AccountHomeButton from "./account-home-button";

class PasswordForget extends Component {
    componentWillMount() {
        document.body.classList.add("bg-account-pages");
        document.body.classList.add("py-4");
        document.body.classList.add("py-sm-0");
    }
    render() {
        return (
            <React.Fragment>
                {/* render home button */}
                <AccountHomeButton/>
                <section className="height-100vh">
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg="5">
                                        <Card className="account-card">
                                            <CardBody>
                                                <div className="text-center mt-3">
                                                    <h3 className="font-weight-bold"><Link to="index-1.html" className="text-dark text-uppercase account-pages-logo"><i className="mdi mdi-alien"></i>Hiric</Link></h3>
                                                    <p className="text-muted">Reset Password</p>
                                                </div>
                                                <div className="p-3">
                                                    <div className="alert alert-warning  text-center" role="alert">
                                                        Enter your email address and we'll send you an email with instructions to reset your password.
                                                    </div>
                                                    <AvForm>
                                                        <AvGroup className="form-group">
                                                            <Label for="email">Email</Label>
                                                            <AvField type="email" className="form-group mt-2" name="email" id="email" placeholder="Enter Email" required
                                                                errorMessage=""
                                                                validate={{
                                                                    required: {value: true, errorMessage: "Please enter your email"},
                                                                }}
                                                            />
                                                        </AvGroup>

                                                        <div className="mt-3">
                                                            <Button type="submit" className="btn btn-custom btn-block">Reset your Password</Button>
                                                        </div>
                                                    </AvForm>
                                                </div>
                                            </CardBody>
                                        </Card>
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

export default PasswordForget;
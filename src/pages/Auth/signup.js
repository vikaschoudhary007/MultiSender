import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button, Label, Input } from "reactstrap";
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

//Import Home Button
import AccountHomeButton from "./account-home-button";

class SignUp extends Component {
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
                                                        <h3 className="font-weight-bold"><a href="index-1.html" className="text-dark text-uppercase account-pages-logo"><i className="mdi mdi-alien"></i>Hiric</a></h3>
                                                        <p className="text-muted">Sign up for a new Account</p>
                                                    </div>
                                                    <div className="p-3">
                                                        <AvForm>
                                                            <AvGroup className="form-group">
                                                                <Label for="firstname">First Name</Label>
                                                                <AvField type="text" className="form-group mt-2" name="firstname" id="firstname" placeholder="First Name" required
                                                                    errorMessage=""
                                                                    validate={{
                                                                        required: {value: true, errorMessage: "Please enter your username"},
                                                                    }}
                                                                />
                                                            </AvGroup>

                                                            <AvGroup className="form-group">
                                                                <Label for="email">Email</Label>
                                                                <AvField type="email" className="form-group mt-2" name="email" id="email" placeholder="Enter Email" required
                                                                    errorMessage=""
                                                                    validate={{
                                                                        required: {value: true, errorMessage: "Please enter your email"},
                                                                                                                        }}
                                                                />
                                                            </AvGroup>

                                                            <AvGroup className="form-group">
                                                                <Label for="userpassword">Password</Label>
                                                                <AvField name="userpassword" type="password" className="form-control" id="userpassword" placeholder="Enter password" required
                                                                    errorMessage=""
                                                                    validate={{
                                                                        required: {value: true, errorMessage: "Please enter a username"},
                                                                    minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                                    maxLength: {value: 10, errorMessage: 'Your password must be between 6 and 10 characters'}
                                                                }} />
                                                            </AvGroup>

                                                            <AvGroup className="custom-control custom-checkbox">
                                                                <Input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                                                <Label className="custom-control-label" for="customControlInline">Remember me</Label>
                                                            </AvGroup>

                                                            <div className="mt-3">
                                                                <Button type="submit" className="btn btn-custom btn-block">Sign in</Button>
                                                            </div>

                                                            <div className="mt-4 mb-0 text-center">
                                                                <p className="mb-0">Don't have an account ? <Link to="/login" className="text-danger">Sign in</Link></p>
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

export default SignUp;
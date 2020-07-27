import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Import Particles
import Particles from 'react-particles-js';

//Importing Modal
import ModalSection from '../../components/common/ModalSection';

class Section extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.callModal.bind(this)
    }

    callModal = () => {
        this.refs.child.openModal();
    }
    
    render() {
        return (
            <React.Fragment>
                <section className="section bg-home height-100vh" id="home">
                    <div className="bg-overlay">
                            <Particles
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 90
                                        },
                                        "size": {
                                            "value": 4
                                        }
                                    },
                                    "interactivity": {
                                        "events": {
                                            "onhover": {
                                                "enable": true,
                                                "mode": "repulse"
                                            }
                                        }
                                    },
                                    "move" : {
                                        "radius" : 1
                                    }
                                }}
                            />
                    </div>
                    <div className="">
                        <div className="">
                            <Container className="slidero">
                                <Row>
                                    <Col lg={{size:8, offset:2}} className="text-white text-center">
                                        <h4 className="home-small-title">Awesome Design</h4>
                                        <h1 className="home-title">We love make things amazing and simple</h1>
                                        <p className="padding-t-15 home-desc mx-auto">Maecenas class semper class semper sollicitudin lectus lorem iaculis imperdiet aliquam vehicula tempor auctor curabitur pede aenean ornare.</p>
                                        <p className="play-shadow margin-t-30 margin-l-r-auto">
                                        <Link
                                            onClick={this.callModal}
                                            to="#"
                                            className="play-btn video-play-icon"
                                        >
                                            <i className="mdi mdi-play text-center"></i>
                                        </Link>
                                        </p>  
                                    </Col>
                                </Row>
                            </Container>
                            {/* Render ModalSection Component for Modal */}
                            <ModalSection ref="child" channel='vimeo' videoId='99025203' />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;
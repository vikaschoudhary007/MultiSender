import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

class PricingBox extends Component {
    render() {
        return (
            <React.Fragment>
                            <Col lg="4">
                                <div className="text-center pricing-box bg-white price-active">
                                    {
                                        this.props.pricing.isRibbon
                                        ? <div className="ribbon-box"><span>Popular</span></div>
                                        : null
                                    }
                                    <h4 className="text-uppercase">{this.props.pricing.title}</h4>
                                    <h1>${this.props.pricing.price}</h1>
                                    <h6 className="text-uppercase text-muted">Billing Per {this.props.pricing.duration}</h6>
                                    <div className="plan-features margin-t-50">
                                        <p>Bandwidth: <b className="text-custom">{this.props.pricing.features.bandwith}</b></p>
                                        <p>Onlinespace: <b className="text-custom">{this.props.pricing.features.onlinespace}</b></p>
                                        <p>Support: <b className="text-custom">{this.props.pricing.features.support}</b></p>
                                        <p><b className="text-custom">{this.props.pricing.features.domain}</b> Domain</p>
                                        <p><b className="text-custom">{this.props.pricing.features.hiddenFees}</b> Hidden Fees</p>
                                    </div>
                                    <Link to="#" className="btn btn-custom waves-effect waves-light margin-t-30">Join Now</Link>
                                </div>
                            </Col>
            </React.Fragment>
        );
    }
}

export default PricingBox;
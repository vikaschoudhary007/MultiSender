import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AccountHomeButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="account-home-btn d-none d-sm-block">
                    <Link to="/" class="text-white"><i class="mdi mdi-home h1"></i></Link>
                </div>
            </React.Fragment>
        );
    }
}

export default AccountHomeButton;
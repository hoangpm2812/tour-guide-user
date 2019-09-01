import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoginBackgroundSlider from '../../components/LoginBackgroundSlider/LoginBackgroundSlider';

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (localStorage.getItem('user') !== null) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container">
                <LoginBackgroundSlider />
            </div>
        );
    }
}

export default withRouter(LoginPage);

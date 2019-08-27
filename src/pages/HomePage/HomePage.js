import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    logOut = () => {
        var _this = this;
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('user');
            _this.props.history.replace('/login');

        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let user = firebase.auth().currentUser;
        return (
            <div className="container">
                <h1>Hello {user.email}</h1>
                <button type="button" className="btn btn-primary" onClick={this.logOut}>
                    Đăng xuất
                </button>
            </div>
        );
    }
}

export default withRouter(HomePage);

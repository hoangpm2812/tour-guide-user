import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import Api from '../../services/ApiService';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    logOut = () => {
        var _this = this;
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('user');
            _this.props.history.push('/login');

        }).catch(function (error) {
            console.log(error);
        });
    }

    getListRoom = () => {
        var _this = this;
        Api.create().getListRoom(res => {
            console.log(res)
        }, err => {
            console.log(err)
        })
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        return (
            <div className="container">
                <h1>Hello {user.email}</h1>
                <button type="button" className="btn btn-primary" onClick={this.logOut}>
                    Đăng xuất
                </button>
                <button type="button" className="btn btn-primary" onClick={this.getListRoom}>
                    Get List Room
                </button>
            </div>
        );
    }
}

export default withRouter(HomePage);

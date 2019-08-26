import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Api from '../../services/ApiService';
import LoginBackgroundSlider from '../../components/LoginBackgroundSlider/LoginBackgroundSlider';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: ''
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.history.push('/');
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var data = {
            username: this.state.txtUsername,
            password: this.state.txtPassword
        }
        Api.create().login(data, (res) => {
            console.log(res);
            if (res.data) {
                localStorage.setItem('token', res.data);
                this.props.history.push('/');
            }
        }, (err) => {

        })
    }

    render() {
        return (
            <div className="container">
                <LoginBackgroundSlider />
                {/* <h1>Login page</h1>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="txtUsername"
                                value={this.state.txtUsername}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="txtPassword"
                                value={this.state.txtPassword}
                                onChange={this.onChange}
                            />
                        </div>

                        <Link to="/product-list" className="btn btn-danger mr-10">
                        Trở Lại
                    </Link>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                </div> */}
            </div>
        );
    }
}

export default withRouter(LoginPage);

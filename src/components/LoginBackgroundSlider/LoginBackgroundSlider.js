import React, { Component } from 'react';
import './LoginBackgroundSlider.css';
import { withRouter } from 'react-router-dom';
import Api from '../../services/ApiService';
import firebase from 'firebase';
import { database } from '../../constants/Firebase';

const LoginBackgroundOption = {
  leftIndex: '0',
  rightIndex: '50%'
}

class LoginBackgroundSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: LoginBackgroundOption.rightIndex,
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

  googleSignInPopup = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithPopup(provider).then(function (result) {
      console.log('gooogleSignInPopup')
      console.log(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      console.log(error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  facebookSignInPopup = () => {
    firebase.auth().signOut().then(function () {
      console.log('signed out')
      // Sign-out successful.
    }).catch(function (error) {
      console.log(error)
      // An error happened.
    });
  }

  render() {
    let styled = {
      left: this.state.left
    };
    return (
      <div>

        <div className="loginSlideContainer" style={styled}>
          <div className="containerRight">
            <div className="textAccount">
              Bạn chưa có tài khoản?
            </div>
            <button type="button" className="btn btn-loginslide" onClick={this.slideComponent}>
              {this.state.left === LoginBackgroundOption.leftIndex ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
            </button>
          </div>
        </div>

        <div className="loginSlideContainerLeft"
          style={{
            left: this.state.left === LoginBackgroundOption.leftIndex ?
              LoginBackgroundOption.rightIndex : LoginBackgroundOption.leftIndex
          }}>
          <div className="containerLeft">
            <h1>Login page</h1>

            <div className="inline">
              <div className="button-facebook-google" onClick={this.facebookSignInPopup}>
                <i className="fa fa-facebook" style={{ fontSize: '28px' }}></i>
              </div>
              <div className="button-facebook-google" onClick={this.googleSignInPopup}>
                <i className="fa fa-google-plus" style={{ fontSize: '28px' }}></i>
              </div>
            </div>


            <div className="formLogin">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="txtUsername"
                  value={this.state.txtUsername}
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="txtPassword"
                  value={this.state.txtPassword}
                  onChange={this.onChange}
                  placeholder="Mật khẩu"
                />
              </div>


            </div>
            <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Login</button>

          </div>
        </div>

      </div>
    );
  }

  slideComponent = () => {
    if (this.state.left === LoginBackgroundOption.leftIndex) {
      this.setState({ left: LoginBackgroundOption.rightIndex });
    } else {
      this.setState({ left: LoginBackgroundOption.leftIndex });
    }

    var user = firebase.auth().currentUser;
    console.log('slide component');
    console.log(user)

    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  }
}

export default withRouter(LoginBackgroundSlider);

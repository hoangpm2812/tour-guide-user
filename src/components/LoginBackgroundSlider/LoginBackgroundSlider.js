import React, { Component } from 'react';
import './LoginBackgroundSlider.css';
import { withRouter } from 'react-router-dom';
import Api from '../../services/ApiService';

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
    Api.create().googleSignIn(res => {
      console.log(this.props)
      this.props.history.replace('/');
    }, err => {
      console.log(err)
    })
  }

  facebookSignInPopup = () => {
    global.root.showErrorNotification('Not available');
  }

  render() {
    let styled = {
      left: this.state.left
    };
    let isLeft = this.state.left === LoginBackgroundOption.leftIndex;
    return (
      <div>

        <div className="loginSlideContainer" style={styled}>
          <div className="containerRight">
            <div className="textAccount">
              {isLeft ? 'Bạn đã có tài khoản?' : 'Bạn chưa có tài khoản?'}
            </div>
            <button type="button" className="btn btn-loginslide" onClick={this.slideComponent}>
              {isLeft ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
            </button>
          </div>
        </div>

        <div className="loginSlideContainerLeft"
          style={{
            left: isLeft ?
              LoginBackgroundOption.rightIndex : LoginBackgroundOption.leftIndex
          }}>
          <div className="containerLeft">
            <h1>
              {isLeft ? 'Tạo tài khoản' : 'Đăng nhập'}
            </h1>

            <div className="inline">
              <div className="button-facebook-google" onClick={this.facebookSignInPopup}>
                <i className="fa fa-facebook" style={{ fontSize: '28px' }}></i>
              </div>
              <div className="button-facebook-google" onClick={this.googleSignInPopup}>
                <i className="fa fa-google-plus" style={{ fontSize: '28px' }}></i>
              </div>
            </div>

            <div style={{marginBottom: '20px'}}>
              Hoặc sử dụng email của bạn
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
            <button type="button" className="btn btn-primary btn-login" onClick={this.onSubmit}>
              {isLeft ? 'Đăng ký' : 'Đăng nhập'}
            </button>

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
  }
}

export default withRouter(LoginBackgroundSlider);

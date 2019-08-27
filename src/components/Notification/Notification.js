import React, { Component } from 'react';
import './notification.css';
import * as NotificationTypes from './NotificationTypes';

const notificationOptions = {
  successColor: '#90b900',
  errorColor: '#e85656',
  infoColor: '#2dacd1',
  topDefault: 16
}

class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: -100,
      content: '',
      backgroundColor: ''
    };

    this.timeout = null;
  }
 
  render() {
    let styled = {
      top: this.state.top + 'px',
      backgroundColor: this.state.backgroundColor
    };
      return (
        <div className='notificationContainer' style={styled}
            onClick={this.onClickNotification}>
          {this.state.content}
        </div>
      );
  }

  showNotification = (content = '', type) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState({top: -100}, () => {
        this.timeout = setTimeout(() => {
          this.onShowNotification(content, type);
        }, 500);
      })
    } else {
      this.onShowNotification(content, type);
    }
  }

  onShowNotification = (content, type) => {
    var backgroundColor = this.getNotificationColor(type);
    this.setState({
      top: notificationOptions.topDefault,
      content: content,
      backgroundColor: backgroundColor
    }, () => {
      this.timeout = setTimeout(() => {
        this.setState({
          top: -100
        })
      }, 3000);
    })
  }

  onClickNotification = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({top: -100});
  }

  getNotificationColor = (type) => {
    var backgroundColor = '';
    switch (type) {
      case NotificationTypes.SUCCESS: 
        backgroundColor = notificationOptions.successColor;
        break;
      case NotificationTypes.ERROR:
        backgroundColor = notificationOptions.errorColor;
        break;
      default:
        backgroundColor = notificationOptions.infoColor;
    }
    return backgroundColor;
  }
}

export default Notification;

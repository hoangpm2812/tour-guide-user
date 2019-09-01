import React, { Component } from 'react';
import './notification.css';
import * as NotificationTypes from './NotificationTypes';

const NotificationOptions = {
  successColor: '#90b900',
  errorColor: '#e85656',
  infoColor: '#2dacd1',
  topDefault: 16,
  topDisapear: -150
}

class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: NotificationOptions.topDisapear,
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
      this.setState({top: NotificationOptions.topDisapear}, () => {
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
      top: NotificationOptions.topDefault,
      content: content,
      backgroundColor: backgroundColor
    }, () => {
      this.timeout = setTimeout(() => {
        this.setState({
          top: NotificationOptions.topDisapear
        })
      }, 3000);
    })
  }

  onClickNotification = (e) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({top: NotificationOptions.topDisapear});
  }

  getNotificationColor = (type) => {
    var backgroundColor = '';
    switch (type) {
      case NotificationTypes.SUCCESS: 
        backgroundColor = NotificationOptions.successColor;
        break;
      case NotificationTypes.ERROR:
        backgroundColor = NotificationOptions.errorColor;
        break;
      default:
        backgroundColor = NotificationOptions.infoColor;
    }
    return backgroundColor;
  }
}

export default Notification;

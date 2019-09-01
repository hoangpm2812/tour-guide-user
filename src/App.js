import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Spinner from './components/Spinner/Spinner';
import routes from './routes/routes';
import Notification from './components/Notification/Notification';
import * as NotificationTypes from './components/Notification/NotificationTypes';
import { database } from './constants/Firebase';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}

	}

	render() {
		return (
			<Router>
				<div>
					{
						this._renderRoute()
					}
					{
						this._renderLoading()
					}
					{
						this._renderNotification()
					}
				</div>
			</Router>
		);
	}

	componentDidMount() {
		global.root = this;
	}

	_renderRoute = () => {
		var result = null;
		if (routes.length > 0) {
			result = routes.map((route, index) => {
				if (route.private) return (
					<PrivateRoute key={index} exact path={route.path} component={route.main} />
				)
				else return (
					<Route key={index} exact path={route.path} component={route.main} />
				)
			})
		}
		return result;
	}

	_renderLoading = () => {
		return (
			<Spinner ref={instance => this.loadingInstance = instance} />
		);
	}

	_renderNotification = () => {
		return (
			<Notification ref={instance => this.notificationInstance = instance} />
		);
	}

	showLoading = (enable) => {
		this.loadingInstance.showLoading(enable);
	}

	showSuccessNotification = (content) => {
		this.notificationInstance.showNotification(content, NotificationTypes.SUCCESS);
	}

	showErrorNotification = (content) => {
		this.notificationInstance.showNotification(content, NotificationTypes.ERROR);
	}


}

export default App;

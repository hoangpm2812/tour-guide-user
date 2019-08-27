import axios from 'axios';
import * as Config from './../constants/Config';
import firebase from 'firebase';


const create = () => {
    const googleSignIn = (sucess, error) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithPopup(provider).then(function (result) {
            localStorage.setItem('user', JSON.stringify(result.user));
            sucess(result);
        }).catch(function (err) {
            error(err);
            global.root.showErrorNotification(err.message);
        });
    }

    const facebookSignIn = (sucess, error) => {
        
    }

    const login = (params, success, error) => request('POST', 'oauth/token', params, success, error);

    return {
        googleSignIn,
        facebookSignIn,
        login
    }
}

const request = (method = 'GET', endpoint, params, successCallback, errorCallback) => {
    var token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null;
    global.root.showLoading(true);
    axios({
        method: method,
        url: `${Config.API_URL}${endpoint}`,
        data: method === 'GET' ? null : params,
        params: method === 'GET' ? params : null,
        headers: {
            'Content-Type': 'application/json',
            'access-token': token
        },
        timeout: 10000
    }).then(res => {
        global.root.showLoading(false);
        if (successCallback) {
            successCallback(res.data);
        }
    }).catch(err => {
        global.root.showLoading(false);
        var response = err.response;
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            if (errorCallback) {
                errorCallback(response);
            }

            //_temp message_ chang to another message
            global.root.showErrorNotification(err.message);
        } else {
            console.log(err.message)
            global.root.showErrorNotification(err.message);
        }

    });
}

export default {
    create
}


import axios from 'axios';
import * as Config from './../constants/Config';
import firebase from 'firebase';
import { database } from './../constants/Firebase';


const create = () => {
    const googleSignIn = (onSuccess, onError) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithPopup(provider).then(function (result) {
            localStorage.setItem('user', JSON.stringify(result.user));
            if (onSuccess) onSuccess(result);
        }).catch(function (error) {
            if (onError) onError(error);
            global.root.showErrorNotification(error.message);
        });
    }

    const facebookSignIn = (onSuccess, onError) => {
        
    }

    const emailSignIn = (email, password, onSuccess, onError) => {
        global.root.showLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
            localStorage.setItem('user', JSON.stringify(result.user));
            global.root.showLoading(false);
            if (onSuccess) onSuccess(result);
        }).catch(function(error) {
            global.root.showLoading(false);
            global.root.showErrorNotification(error.message);
            if (onError) onError(error);
        });
    }

    const createUserWithEmailPassword = (email, password, onSuccess, onError) => {
        global.root.showLoading(true);
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
            console.log(result);
            global.root.showLoading(false);
            global.root.showSuccessNotification('Successfully')
            if (onSuccess) onSuccess(result);
        }).catch(function(error) {
            global.root.showLoading(false);
            global.root.showErrorNotification(error.message);
            if (onError) onError(error);
          });
    }

    const login = (params, onSuccess, onError) => request('POST', 'oauth/token', params, onSuccess, onError);
    const getListRoom = (onSuccess, onError) => firebaseReadOnce('/room/', onSuccess, onError);


    return {
        googleSignIn,
        facebookSignIn,
        emailSignIn,
        createUserWithEmailPassword,
        login,
        getListRoom
    }
}

const request = (method = 'GET', endpoint, params, onSuccess, onError) => {
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
        if (onSuccess) {
            onSuccess(res.data);
        }
    }).catch(err => {
        global.root.showLoading(false);
        var response = err.response;
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            if (onError) {
                onError(response);
            }

            //_temp message_ chang to another message
            global.root.showErrorNotification(err.message);
        } else {
            console.log(err.message)
            global.root.showErrorNotification(err.message);
        }

    });
}

const firebaseReadOnce = (endpoint, onSuccess, onError) => {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        global.root.showLoading(true);
        database.ref(endpoint).once('value')
        .then(function(snapshot) {
            global.root.showLoading(false);
            if (onSuccess) onSuccess(snapshot.val());
        }).catch(function (error) {
            global.root.showLoading(false);
            global.root.showErrorNotification(error.message);
            if (onError) onError(error);
        })
    } else {
        localStorage.removeItem('user');
        global.root.showErrorNotification('You are not log in yet.');
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }
}

export default {
    create
}


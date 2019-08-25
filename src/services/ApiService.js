import axios from 'axios';
import * as Config from './../constants/Config';


const create = () => {
    const login = (params, success, error) => request('POST', 'oauth/token', params, success, error);

    return {
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


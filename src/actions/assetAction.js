import axios from 'axios';
import React from 'react';
import setup from '../../src/js/setup/api';

export const GET_MODEL = 'GET_MODEL';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_MANUFACTURER = 'GET_MANUFACTURER';
export const GET_PROCESSOR = 'GET_PROCESSOR';
export const GET_SUPPLIER = 'GET_SUPPLIER';
export const GET_DISK = 'GET_DISK';
export const GET_MEMORY = 'GET_MEMORY';
export const GET_VCARD = 'GET_VCARD';
export const GET_STATUS = 'GET_STATUS';
export const GET_ASSET = 'GET_ASSET';
export const GET_USER = 'GET_USER';
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const GET_ASSET_ID = 'GET_ASSET_ID';
export const GET_ERROR = 'GET_ERROR';


/** MODEL */
export const getModels = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Models + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
        }).then((response) => {
            dispatch({
                type: GET_MODEL,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** CATEGORY */
export const getCategories = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Categories + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_CATEGORY,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** MANUFACTURER */
export const getManufacturers = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Manufacturers + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_MANUFACTURER,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** PROCESSOR */
export const getProcessors = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Processors + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_PROCESSOR,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** SUPPLIERs */
export const getSuppliers = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Suppliers + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_SUPPLIER,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** DISK */
export const getDisks = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Harddisk + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_DISK,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** Memory */
export const getMemories = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Memory + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_MEMORY,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** VCard */
export const getVCards = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Videocard + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_VCARD,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** STATUS TYPE */
export const getStatus = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Status, {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_STATUS,
                payload: response.data
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** MODEL */
export const getAssets = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Assets + setup.ShowAll + 'true', {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    })
        .then((response) => {
            dispatch({
                type: GET_ASSET,
                payload: response.data.list,
                currentPage: response.data.currentPage,
                totalPage: response.data.totalPage,
                total: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

export const postAPI = (url, object) => async dispatch => {
    return await axios.post(url, object, {
        'header':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    }).then((response) => {
        dispatch({
            type: GET_ERROR,
            payload: null
        })
    })
    .catch(function (error) {
        dispatch({
            type: GET_ERROR,
            payload: error.response.data
        })
    });
}

export const putAPI = (url, id, object) => async dispatch => {
    return await axios.put(url + id, object, {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
    }).then((response) => {
        dispatch({
            type: GET_ERROR,
            payload: null
        })
    })
    .catch(function (error) {
        dispatch({
            type: GET_ERROR,
            payload: error.response.data
        })
    });
}

export const postUser = (userName, password, callback = null) => async dispatch => {
    await axios.post(setup.BASE_URL + setup.LoginUser + 'UserName=' + userName + '&Password=' + password)
        .then((response) => {
            dispatch({
                type: AUTHENTICATED,
            })
            localStorage.setItem('user', response.data.token);
            localStorage.setItem('id', response.data.id);
            if(callback){
               callback();
            }
        }).then((response) => {
            dispatch({
                type: GET_ERROR,
                payload: null
            })
        })
        .catch(function (error) {
            dispatch({
                type: GET_ERROR,
                payload: error.response.status
            })
        });
}

export const getUser = (id) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.GetUser + id, {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
        }).then((response) => {
            dispatch({
                type: GET_USER,
                payload: response.data.list,
            })
        }).catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        })
}

export const signOut = () => async dispatch => {
    await localStorage.clear();
}

export const getAssetById = (id) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Assets + '/' + id, {
        'headers':{
            "Authorization" : "Bearer " + localStorage.getItem('user'),
            "Id" : localStorage.getItem('id')
        }
        }).then((response) => {
            dispatch({
                type: GET_ASSET_ID,
                payload: response.data,
            })
        })
}
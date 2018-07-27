import { 
    GET_MODEL,
    GET_CATEGORY,
    GET_MANUFACTURER,
    GET_PROCESSOR,
    GET_SUPPLIER,
    GET_DISK,
    GET_MEMORY,
    GET_VCARD,
    GET_STATUS,
    GET_ASSET
} from './actionType';
import axios from 'axios';
import setup from '../../src/js/setup/api';

/** MODEL */
export const getModels = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Models + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_MODEL,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** CATEGORY */
export const getCategories = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Categories + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_CATEGORY,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** MANUFACTURER */
export const getManufacturers = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Manufacturers + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_MANUFACTURER,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** PROCESSOR */
export const getProcessors = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Processors + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_PROCESSOR,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** SUPPLIERs */
export const getSuppliers = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Suppliers + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_SUPPLIER,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** DISK */
export const getDisks = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Harddisk + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_DISK,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** Memory */
export const getMemories = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Memory + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_MEMORY,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** VCard */
export const getVCards = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Sizes.Videocard + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_VCARD,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

/** STATUS TYPE */
export const getStatus = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Status)
        .then((response) => {
            dispatch({
                type: GET_STATUS,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}

/** MODEL */
export const getAssets = () => dispatch => {
    axios.get(setup.BASE_URL + setup.Assets + setup.ShowAll + 'true')
        .then((response) => {
            dispatch({
                type: GET_ASSET,
                payload: response.data.list
            })
        })
        .catch(error => console.log(error))
}

export const postAPI = (url, object) => async dispatch => {
    return await axios.post(url, object)
}

export const putAPI = (url, id, object) => async dispatch => {
    return await axios.put(url + id, object)
}
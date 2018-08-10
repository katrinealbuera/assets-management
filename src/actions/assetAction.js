import axios from 'axios';
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
export const GET_USER_ID = 'GET_USER_ID';
export const GET_STATUS_TYPE = 'GET_STATUS_TYPE';
export const GET_ASSET_ORDER_BY ='GET_ASSET_ORDER_BY';
export const GET_ASSET_ORDER_TYPE ='GET_ASSET_ORDER_TYPE';
export const GET_ASSET_BY_KEYWORD = 'GET_ASSET_BY_KEYWORD';
export const NEXT_PAGE = 'NEXT_PAGE';

export const nextPage = page => ({
    type: NEXT_PAGE,
    page,
})

const requestHeader = {
    headers: {
        'Authorization' : "Bearer " + localStorage.getItem('user'),
        'Access-Control-Allow-Origin' : '*',
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Methods' : 'PUT, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
}

/** MODEL */
export const getModels = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Models + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
    .then((response) => {
            dispatch({
                type: GET_MODEL,
                modelPayload: response.data.list,
                modelCurrentPage: response.data.currentPage,
                modelTotalPage: response.data.totalPage,
                modelTotal: response.data.total,
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
export const getCategories = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Categories + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_CATEGORY,
                categoryPayload: response.data.list,
                categoryCurrentPage: response.data.currentPage,
                categoryTotalPage: response.data.totalPage,
                categoryTotal: response.data.total,
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
export const getManufacturers = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Manufacturers + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_MANUFACTURER,
                manufacturerPayload: response.data.list,
                manufacturerCurrentPage: response.data.currentPage,
                manufacturerTotalPage: response.data.totalPage,
                manufacturerTotal: response.data.total,
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
export const getProcessors = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Processors + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_PROCESSOR,
                processorPayload: response.data.list,
                processorCurrentPage: response.data.currentPage,
                processorTotalPage: response.data.totalPage,
                processorTotal: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** SUPPLIERS */
export const getSuppliers = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Suppliers + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_SUPPLIER,
                supplierPayload: response.data.list,
                supplierCurrentPage: response.data.currentPage,
                supplierTotalPage: response.data.totalPage,
                supplierTotal: response.data.total,
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
export const getDisks = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Sizes.Harddisk + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_DISK,
                diskPayload: response.data.list,
                diskCurrentPage: response.data.currentPage,
                diskTotalPage: response.data.totalPage,
                diskTotal: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** MEMORY */
export const getMemories = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Sizes.Memory + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_MEMORY,
                memoryPayload: response.data.list,
                memoryCurrentPage: response.data.currentPage,
                memoryTotalPage: response.data.totalPage,
                memoryTotal: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        })
}

/** VIDEOCARD */
export const getVCards = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Sizes.Videocard + `?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_VCARD,
                vcardPayload: response.data.list,
                vcardCurrentPage: response.data.currentPage,
                vcardTotalPage: response.data.totalPage,
                vcardTotal: response.data.total,
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
export const getStatus = () => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Status, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_STATUS,
                statusPayload: response.data
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** ASSET ORDER BY */
export const getAssetsOrderBy = () => async dispatch => {
    await axios.get(setup.BASE_URL + setup.AssetsOrderBy, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_ASSET_ORDER_BY,
                assetPayload: response.data
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** ASSET ORDER TYPE */
export const getAssetsOrderType = () => async dispatch => {
    await axios.get(setup.BASE_URL + setup.AssetsOrderType, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_ASSET_ORDER_TYPE,
                assetPayload: response.data
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** GET ALL ASSETS  */
export const getAssets = (orderBy = '', orderType = '', keyword = '', currentPage = '1', showAll = false, callback = null) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Assets + `?ShowAll=${showAll}&OrderBy=${orderBy}&OrderType=${orderType}&Keyword=${keyword}&CurrentPage=${currentPage}`, 
    requestHeader)
        .then((response) => {
            dispatch({
                type: GET_ASSET,
                assetPayload: response.data.list,
                assetCurrentPage: response.data.currentPage,
                assetTotalPage: response.data.totalPage,
                assetTotal: response.data.total,
            })

            if (response.status === 200) {
                if (callback) {
                    callback()
                }
            }
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** GET ASSET BY KEYWORD  */
export const getAssetsByKeyword = () => async dispatch => {
    await axios.get(setup.BASE_URL + setup.AssetsOrderBy, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_ASSET_BY_KEYWORD,
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

/**  GET ASSET BY ID */
export const getAssetById = (id) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.Assets + `/${id}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_ASSET_ID,
                payload: response.data,
            })
        }).catch(function (error) {
            dispatch({
                type: GET_ERROR,
                payload: error.response.status
            })
        })
}

/** LOGIN  */
export const postUser = (userName, password, callback = null) => async dispatch => {
    await axios.post(setup.BASE_URL + setup.LoginUser + `UserName=${userName}&Password=${password}`, requestHeader)
        .then((response) => {
            dispatch({
                type: AUTHENTICATED,
            })
                localStorage.setItem('user', response.data.token);
                localStorage.setItem('id', response.data.id);

                if (callback){
                callback();
                }

        })
        .catch(function (error) {
            dispatch({
                type: GET_ERROR,
                payload: error.response.status
            })
        });
}

/** GET ALL USERS  */
export const getUsers = (currentPage = '1', showAll = false) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.GetUser + `/?ShowAll=${showAll}&CurrentPage=${currentPage}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_USER,
                userPayload: response.data.list,
                userCurrentPage: response.data.currentPage,
                userTotalPage: response.data.totalPage,
                userTotal: response.data.total,
            })
        })
        .catch(function (error) {
            dispatch({
                type: UNAUTHENTICATED,
                payload: error.response.status
            })
        });
}

/** GET USER BY ID  */
export const getUserId = (id) => async dispatch => {
    await axios.get(setup.BASE_URL + setup.GetUser + `/${id}`, requestHeader)
        .then((response) => {
            dispatch({
                type: GET_USER_ID,
                userIdPayload: response.data,
            })
        })
        .catch(function (error) {
            dispatch({
                type: GET_ERROR,
                payload: error.response.status
            })
        })
}

/** ADD  */
export const postAPI = (url, object) => async dispatch => {
    return await axios.post(url, object, requestHeader)
    .then((response) => {
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

/** EDIT  */
export const putAPI = (url, id, object) => async dispatch => {
    return await axios.put(url + `/${id}`, object, requestHeader)
    .then((response) => {
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

/** SIGN OUT  */
export const signOut = (callback = null) => async dispatch => {
    if (callback){
        await callback();
        await localStorage.clear();
     }
}

export const clearError = () => dispatch => {
    dispatch({
        type: GET_ERROR,
        payload: null
    })
}
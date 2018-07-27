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
    } from '../actions/actionType';

const initialState = {
    assetList: [],
    modelList: [],
    categoryList:[],
    manufacturerList: [],
    processorList: [],
    supplierList: [],
    diskList: [],
    memoryList: [],
    vcardList: [],
    statusList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MODEL :
            return {
                ...state,
                modelList: action.payload
            };
        case GET_CATEGORY : 
            return {
                ...state,
                categoryList: action.payload
            }
        case GET_MANUFACTURER : 
            return {
            ...state,
            manufacturerList: action.payload
        }
        case GET_PROCESSOR : 
            return {
            ...state,
            processorList: action.payload
        }
        case GET_SUPPLIER : 
            return {
            ...state,
            supplierList: action.payload
        }
        case GET_DISK : 
            return {
            ...state,
            diskList: action.payload
        }
        case GET_MEMORY : 
            return {
            ...state,
            memoryList: action.payload
        }
        case GET_VCARD : 
            return {
            ...state,
            vcardList: action.payload
        }
        case GET_STATUS : 
            return {
            ...state,
            statusList: action.payload
        }
        case GET_ASSET : 
            return {
            ...state,
            assetList: action.payload
        }
        default:
            return state;
    }
}
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
    GET_ASSET,
    GET_USER,
    AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR,
    GET_ASSET_ID, GET_ERROR, GET_SUCCESS,
    } 
    from '../actions/assetAction';

const initialState = {
    assetList: [],
    asset: [],
    modelList: [],
    categoryList:[],
    manufacturerList: [],
    processorList: [],
    supplierList: [],
    diskList: [],
    memoryList: [],
    vcardList: [],
    statusList: [],
    userList:[],
    isLoading: true,
    authenticated: false,
    error: '',
    currentPage:'',
    totalPage:'',
    total:'',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER : 
            return {
                ...state,
                userList: action.payload,
        }
        case UNAUTHENTICATED : 
            return {
                ...state,
                unauthenticatedError: action.payload
        }
        case GET_MODEL :
            return {
                ...state,
                modelList: action.payload,
                isLoading: false,
                currentPage: action.currentPage,
                totalPage: action.totalPage,
                total: action.total,
            };
        case GET_CATEGORY : 
            return {
                ...state,
                categoryList: action.payload,
                isLoading: false
            }
        case GET_MANUFACTURER : 
            return {
            ...state,
            manufacturerList: action.payload,
            isLoading: false
        }
        case GET_PROCESSOR : 
            return {
            ...state,
            processorList: action.payload,
            isLoading: false
        }
        case GET_SUPPLIER : 
            return {
            ...state,
            supplierList: action.payload,
            isLoading: false
        }
        case GET_DISK : 
            return {
            ...state,
            diskList: action.payload,
            isLoading: false
        }
        case GET_MEMORY : 
            return {
            ...state,
            memoryList: action.payload,
            isLoading: false
        }
        case GET_VCARD : 
            return {
            ...state,
            vcardList: action.payload,
            isLoading: false
        }
        case GET_STATUS : 
            return {
            ...state,
            statusList: action.payload,
            isLoading: false
        }
        case GET_ASSET : 
            return {
            ...state,
            assetList: action.payload,
            isLoading: false
        }
        case GET_ASSET_ID : 
            return {
            ...state,
            asset: action.payload,
            isLoading: false
        }
        case AUTHENTICATED :
            return {
            ...state,
            authenticated: true,
        }
        case AUTHENTICATION_ERROR : 
            return {
            ...state,
            error: action.payload
        }
        case GET_ERROR : 
        return {
            ...state,
            error: action.payload,
        }
        default:
            return state;
    }
}
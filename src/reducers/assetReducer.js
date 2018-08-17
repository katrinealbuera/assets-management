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
    GET_ASSET_ID, GET_ERROR, GET_USER_ID, GET_ASSET_ORDER_BY, GET_ASSET_ORDER_TYPE,
    GET_ASSET_BY_KEYWORD, NEXT_PAGE, GET_NETWORK_ERROR,
    } 
    from '../actions/assetAction';

const initialState = {
    assetList: [],
    asset: [],
    assetTotal: '',
    assetCurrentPage:'',
    assetTotalPage:'',
    assetsIsSuccess: false,

    modelList: [],
    modelTotal: '',
    modelCurrentPage:'',
    modelTotalPage:'',
    errorModel:'',
    modelIsSuccess: false,

    categoryList:[],
    categoryTotal: '',
    categoryCurrentPage:'',
    categoryTotalPage:'',
    categoryIsSuccess: false,

    manufacturerList: [],
    manufacturerTotal: '',
    manufacturerCurrentPage:'',
    manufacturerTotalPage:'',
    manufacturerIsSuccess: false,

    processorList: [],
    processorTotal: '',
    processorCurrentPage:'',
    processorTotalPage:'',
    processorIsSuccess: false,

    supplierList: [],
    supplierTotal: '',
    supplierCurrentPage:'',
    supplierTotalPage:'',
    supplierIsSuccess: false,

    diskList: [],
    diskTotal: '',
    diskCurrentPage:'',
    diskTotalPage:'',
    diskError:'',
    diskIsSuccess: false,

    memoryList: [],
    memoryTotal: '',
    memoryCurrentPage:'',
    memoryTotalPage:'',
    memoryError:'',
    memoryIsSuccess: false,

    vcardList: [],
    vcardTotal: '',
    vcardCurrentPage:'',
    vcardTotalPage:'',
    vcardIsSuccess: false,

    userList:[],
    user:[],
    userTotal: '',
    userCurrentPage:'',
    userTotalPage:'',
    userIsSuccess: false,

    statusList: [],
    assetsOrderBy:[],
    assetsOrderType:[],
    assetsKeyword: [],

    isLoading: true,
    authenticated: false,
    error: '',
    currentPage:'',
    totalPage:'',
    total:'',
    networkError:'',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NEXT_PAGE:
            return {
                ...state,
                page: action.page,
            }
        case GET_USER : 
            return {
                ...state,
                userList: action.userPayload,
                userCurrentPage: action.userCurrentPage,
                userTotalPage: action.userTotalPage,
                userTotal: action.userTotal,
                userIsSuccess: action.userIsSuccess,
        }
        case GET_USER_ID : 
            return {
                ...state,
                user: action.userIdPayload,
                isLoading: false
            }
        case UNAUTHENTICATED : 
            return {
                ...state,
                unauthenticatedError: action.payload
        }
        case GET_MODEL :
            return {
                ...state,
                modelList: action.modelPayload,
                isLoading: false,
                modelCurrentPage: action.modelCurrentPage,
                modelTotalPage: action.modelTotalPage,
                modelTotal: action.modelTotal,
                modelIsSuccess: action.modelIsSuccess,
            };
        case GET_CATEGORY : 
            return {
                ...state,
                categoryList: action.categoryPayload,
                isLoading: false,
                categoryCurrentPage: action.categoryCurrentPage,
                categoryTotalPage: action.categoryTotalPage,
                categoryTotal: action.categoryTotal,
                categoryIsSuccess: action.categoryIsSuccess,
            }
        case GET_MANUFACTURER : 
            return {
                ...state,
                manufacturerList: action.manufacturerPayload,
                isLoading: false,
                manufacturerCurrentPage: action.manufacturerCurrentPage,
                manufacturerTotalPage: action.manufacturerTotalPage,
                manufacturerTotal: action.manufacturerTotal,
                manufacturerIsSuccess: action.manufacturerIsSuccess,
        }
        case GET_PROCESSOR : 
            return {
                ...state,
                processorList: action.processorPayload,
                isLoading: false,
                processorCurrentPage: action.processorCurrentPage,
                processorTotalPage: action.processorTotalPage,
                processorTotal: action.processorTotal,
                processorIsSuccess: action.processorIsSuccess,
            }
        case GET_SUPPLIER : 
            return {
                ...state,
                supplierList: action.supplierPayload,
                isLoading: false,
                supplierCurrentPage: action.supplierCurrentPage,
                supplierTotalPage: action.supplierTotalPage,
                supplierTotal: action.supplierTotal,
                supplierIsSuccess: action.supplierIsSuccess,
        }
        case GET_DISK : 
            return {
                ...state,
                diskList: action.diskPayload,
                isLoading: false,
                diskCurrentPage: action.diskCurrentPage,
                diskTotalPage: action.diskTotalPage,
                diskTotal: action.diskTotal,
                diskIsSuccess: action.diskIsSuccess,
        }
        case GET_MEMORY : 
            return {
                ...state,
                memoryList: action.memoryPayload,
                isLoading: false,
                memoryCurrentPage: action.memoryCurrentPage,
                memoryTotalPage: action.memoryTotalPage,
                memoryTotal: action.memoryTotal,
                memoryIsSuccess: action.memoryIsSuccess,
        }
        case GET_VCARD : 
            return {
                ...state,
                vcardList: action.vcardPayload,
                isLoading: false,
                vcardCurrentPage: action.vcardCurrentPage,
                vcardTotalPage: action.vcardTotalPage,
                vcardTotal: action.vcardTotal,
                vcardIsSuccess: action.vcardIsSuccess,
        }
        case GET_STATUS : 
            return {
                ...state,
                statusList: action.statusPayload,
                isLoading: false
        }
        case GET_ASSET_ORDER_BY : 
            return {
                ...state,
                assetsOrderBy: action.assetPayload,
                isLoading: false
        }
        case GET_ASSET_ORDER_TYPE : 
            return {
                ...state,
                assetsOrderType: action.assetPayload,
                isLoading: false
        }
        case GET_ASSET_BY_KEYWORD : 
            return {
                ...state,
                assetsKeyword: action.assetPayload,
                isLoading: false,
                assetCurrentPage: action.assetCurrentPage,
                assetTotalPage: action.assetTotalPage,
                assetTotal: action.assetTotal,
        }
        case GET_ASSET : 
            return {
                ...state,
                assetList: action.assetPayload,
                isLoading: false,
                assetCurrentPage: action.assetCurrentPage,
                assetTotalPage: action.assetTotalPage,
                assetTotal: action.assetTotal,
                assetsIsSuccess: action.assetsIsSuccess,
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
        case GET_NETWORK_ERROR :
        return {
            ...state,
            networkError: action.network
        }
        default:
            return state;
    }
}
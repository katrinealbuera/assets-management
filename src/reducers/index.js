import { combineReducers } from 'redux';
import assetReducer from './assetReducer';

export default combineReducers({
    models: assetReducer,
    categories: assetReducer,
    manufacturers: assetReducer,
    processors: assetReducer,
    suppliers: assetReducer,
    disks: assetReducer,
    memory: assetReducer,
    vcards: assetReducer,
    status: assetReducer,
    assetsOrderBy: assetReducer,
    assetsOrderType: assetReducer,
    assets: assetReducer,
    unauthenticated: assetReducer,
    users: assetReducer,
    userId: assetReducer,
    assetId: assetReducer,
    error: assetReducer,
    success: assetReducer,
    assetsKeyword: assetReducer,
    page: assetReducer,
    memoryError: assetReducer,
});
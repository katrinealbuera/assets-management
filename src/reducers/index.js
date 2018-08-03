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
    assets: assetReducer,
    unauthenticated: assetReducer,
    users: assetReducer,
    assetId: assetReducer,
    error: assetReducer,
    success: assetReducer,
});
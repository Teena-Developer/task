import { combineReducers } from 'redux';
import ProductReducer from './reducers/productreducer';

const rootReducer = combineReducers({
    products: ProductReducer
});

export default rootReducer;
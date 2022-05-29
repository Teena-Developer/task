import { ADD, NAME, PRICE, REMOVE, UPDATE } from "../constants/constants";

const initialState = {
    products: []
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case UPDATE:
            return {
                ...state,
                products: state.products.map(val => {
                    if (val.id == action.payload.id) {
                        return action.payload
                    } else {
                        return val
                    }
                })
            };
        case REMOVE:
            return {
                ...state,
                products: state.products.filter(val => val.id !== action.payload.id)
            };
        case PRICE:
            return {
                ...state,
                products: state.products.sort(((a, b) => a.finalprice - b.finalprice))
            };
        case NAME:
            return {
                ...state,
                products: state.products.sort(((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                }))
            };
        default:
            return state;
    }
};

export default ProductReducer;
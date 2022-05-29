import { ADD, REMOVE, UPDATE } from "../constants/constants";

export const addItems = data => ({
    type: ADD,
    payload:data
});

export const updateItems = data => ({
    type: UPDATE,
    payload:data
});

export const removeItems = data => ({
    type: REMOVE,
    payload:data
});
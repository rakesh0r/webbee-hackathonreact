import { createSlice } from "@reduxjs/toolkit";

export interface CategoriesState {
    categories: { [key: string]: any }
}

const initialState: { [key: string]: any } = {}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state = { ...state, ...action.payload }
            return state;
        },
        updateCategory: (state, action) => {
            state = { ...state, [action.payload.id]: action.payload }
            return state;
        },
        removeCategory: (state, action) => {
            const next = { ...state }
            delete next[action.payload.id]
            return next;
        }
    }
})

export const { addCategory, updateCategory, removeCategory } = categorySlice.actions

export default categorySlice.reducer
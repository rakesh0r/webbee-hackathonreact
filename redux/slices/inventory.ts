import { createSlice } from "@reduxjs/toolkit";

export interface InventoryState {
    inventory: { [key: string]: any }[]
}

const initialState: any[] = [];

const inventorySlice = createSlice({
    name: 'inventorySlice',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state = [ ...state, action.payload ]
            return state;
        },
        updateItem: (state, action) => {
            state = [...state.map((item) => {
                if(item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })]
            return state;
        },
        removeItem: (state, action) => {
            state = [...state.reduce((acc, curr, i) => {
                if (curr.id !== action.payload.id) acc.push(curr);
                return acc;
            }, [])];
            return state
        }
    }
})

export const { addItem, updateItem, removeItem } = inventorySlice.actions
export default inventorySlice.reducer
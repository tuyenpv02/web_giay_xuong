import { createSlice } from "@reduxjs/toolkit";

const hoaDonSlice = createSlice({
    name: "hoaDon",
    initialState: {
        status: "",
        data: [],
    },
    reducers: {
        fetchData: (state, action) => {
            return {
                ...state,
                data: [...action.payload],
            };
        },
        
    },
});

export default hoaDonSlice;

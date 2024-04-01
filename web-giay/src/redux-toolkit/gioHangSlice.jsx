import { createSlice } from "@reduxjs/toolkit";

const gioHangSlice = createSlice({
    name: "gioHang",
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

export default gioHangSlice;

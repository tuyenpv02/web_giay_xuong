import { createSlice } from "@reduxjs/toolkit";

const phuongThucThanhToanSlice = createSlice({
    name: "phuongThucThanhToan",
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

export default phuongThucThanhToanSlice;

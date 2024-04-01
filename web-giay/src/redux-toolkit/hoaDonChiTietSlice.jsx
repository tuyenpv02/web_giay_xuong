import { createSlice } from "@reduxjs/toolkit";

const hoaDonChiTietSlice = createSlice({
    name: "hoaDonChiTiet",
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

export default hoaDonChiTietSlice;

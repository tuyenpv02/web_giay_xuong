import { createSlice } from "@reduxjs/toolkit";
import {   getAllNhanVien } from "./actions/nhanVienAction";

const nhanVienSlice = createSlice({
    name: "nhanVien",
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
    extraReducers: (builder) => {
        builder
            .addCase(getAllNhanVien.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getAllNhanVien.rejected, (state, action) => {
                console.log("lỗi ", action);
            })
            
    },
});

export default nhanVienSlice;

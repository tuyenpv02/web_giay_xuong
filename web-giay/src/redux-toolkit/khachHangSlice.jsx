import { createSlice } from "@reduxjs/toolkit";
import { getAllKhachHang } from "./actions/nhanVienAction";

const khachHangSlice = createSlice({
    name: "khachHang",
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
        
    },extraReducers: (builder) => {
        builder
            .addCase(getAllKhachHang.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getAllKhachHang.rejected, (state, action) => {
                console.log("lỗi ", action);
            });
    },
});

export default khachHangSlice;

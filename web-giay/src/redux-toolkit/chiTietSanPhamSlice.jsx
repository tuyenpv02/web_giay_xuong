import { createSlice } from "@reduxjs/toolkit";

const chiTietSanPhamSlice = createSlice({
    name: "chiTietSanPham",
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

export default chiTietSanPhamSlice;

import { createSlice } from "@reduxjs/toolkit";

const sanPhamSlice = createSlice({
    name: "sanPham",
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

export default sanPhamSlice;

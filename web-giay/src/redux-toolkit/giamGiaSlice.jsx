import { createSlice } from "@reduxjs/toolkit";

const giamGiaSlice = createSlice({
    name: "giamGia",
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

export default giamGiaSlice;

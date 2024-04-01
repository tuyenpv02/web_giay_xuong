import { createSlice } from "@reduxjs/toolkit";

const lichSuHoaDonSlice = createSlice({
    name: "lichSuHoaDon",
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

export default lichSuHoaDonSlice;

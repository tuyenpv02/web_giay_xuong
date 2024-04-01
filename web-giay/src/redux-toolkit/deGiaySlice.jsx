import { createSlice } from "@reduxjs/toolkit";

const deGiaySlice = createSlice({
    name: "deGiay",
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

export default deGiaySlice;

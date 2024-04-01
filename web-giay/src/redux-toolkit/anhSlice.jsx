import { createSlice } from "@reduxjs/toolkit";

const anhSlice = createSlice({
    name: "anh",
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

export default anhSlice;

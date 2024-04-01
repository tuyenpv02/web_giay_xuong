import { createSlice } from "@reduxjs/toolkit";

const chatLieuSlice = createSlice({
    name: "chatLieu",
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

export default chatLieuSlice;

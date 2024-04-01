import { createSlice } from "@reduxjs/toolkit";

const mauSacSlice = createSlice({
    name: "mauSac",
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

export default mauSacSlice;

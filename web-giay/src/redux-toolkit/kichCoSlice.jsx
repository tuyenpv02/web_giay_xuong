import { createSlice } from "@reduxjs/toolkit";

const KichCoSlice = createSlice({
    name: "KichCo",
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

export default KichCoSlice;

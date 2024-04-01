import { createSlice } from "@reduxjs/toolkit";

const thuongHieuSlice = createSlice({
    name: "ThuongHieu",
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

export default thuongHieuSlice;

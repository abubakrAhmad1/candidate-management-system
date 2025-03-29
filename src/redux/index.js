import { configureStore } from "@reduxjs/toolkit";
import DataSliceReducer from "./slices/DataSlice";

export const store = configureStore({
    reducer : {
        DataSlice: DataSliceReducer,
    },
});
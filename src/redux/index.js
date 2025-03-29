import { configureStore } from "@reduxjs/toolkit";
// import studentDataReducer from "../slices/DataSlice"; // Make sure your slice file name is correct
import studentDataReducer from './slices/DataSlice'

 const store = configureStore({
  reducer: {
    studentData: studentDataReducer, // Use a meaningful and consistent name
  },
});

export default store;

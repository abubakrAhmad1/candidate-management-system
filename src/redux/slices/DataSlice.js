import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "DataSlice",
  initialState: [], 
  reducers: {
    storeData: (state, action) => {
      const { name, position, skills, image } = action.payload; 
      state.push({ name, position, skills, image }); 
    },
  },
});

export const { storeData } = DataSlice.actions;
export default DataSlice.reducer;

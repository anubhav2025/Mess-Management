import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") || "light",
  userId: "63701cc1f03239b7f700000e"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      const newMode= state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      localStorage.setItem("mode", newMode); 
    }
  }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
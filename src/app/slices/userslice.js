import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("user");

const initialState = {
  userinfo: token ? token : null,
};

export const userinfoSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userinfo = action.payload;
    },
    removeUser : (state)=>{
        state.userinfo = null
    }
  },
});

export const { setUser, removeUser } = userinfoSlice.actions;
export default userinfoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  login: () => {},
  register: () => {},
  refreshToken: () => {},
  logout: () => {},
  getActiveUser: () => {},
};

export const usersSlice = createSlice({
  name: "auth",
  initialState: {
    activeUser: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  login,
  register,
  refreshToken,
  logout,
  getActiveUser,
  setActiveUser,
  setToken,
} = usersSlice.actions;

export default usersSlice.reducer;

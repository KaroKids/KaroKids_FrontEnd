import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		user: {},
	},
	reducers: {
		allUsers: (state, { payload }) => {
			state.users = [...state.users, payload];
		},
		getUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const { allUsers, getUser } = userSlice.actions;
export default userSlice.reducer;

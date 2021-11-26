import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
// console.log(usersAdapter.getInitialState());
// _____________________________________________________________________________
// addMany: ƒ operation(state, arg)
// addOne: ƒ operation(state, arg)
// getInitialState: ƒ getInitialState(additionalState)
// getSelectors: ƒ getSelectors(selectState)
// removeAll: ƒ operation(state)
// removeMany: ƒ operation(state, arg)
// removeOne: ƒ operation(state, arg)
// selectId: ƒ (instance)
// setAll: ƒ operation(state, arg)
// setMany: ƒ operation(state, arg)
// setOne: ƒ operation(state, arg)
// sortComparer: false
// updateMany: ƒ operation(state, arg)
// updateOne: ƒ operation(state, arg)
// upsertMany: ƒ operation(state, arg)
// upsertOne: ƒ operation(state, arg)
// ______________________________________________________________________________

// export const getUsers = createAsyncThunk(
//   "users/getUsers", //action type string
//   // action payload creator callback function
//   async () => {
//     try {
//       const res = await fetch("https://randomuser.me/api/?results=10");
//       const data = await res.json();
//       const users = data.results;
//       // covert to JSON
//       const allUsers = users.map((user) => ({
//         id: user.login.uuid,
//         name: `${user.name.first}${user.name.last}`,
//         image: user.picture.thumbnail,
//       }));
//       return allUsers;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const userSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    userInfo: null,
    status: "idle",
    error: null,
    // isAuth: null,
    // isAdmin: null,
    // token: localStorage.getItem("token"),
  }),
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.status = "loading";
    },
    registerSuccess: (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logOut: () => {
      localStorage.removeItem("userInfo");
    },
    usersSetAll: usersAdapter.setAll,
    usersAddOne: usersAdapter.addOne,
    usersAddMany: usersAdapter.addMany,
    userUpdate: usersAdapter.updateOne,
    userRemove: usersAdapter.removeOne,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUsers.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(getUsers.fulfilled, (state, action) => {
  //       state.users = action.payload;
  //       state.status = "succeeded";
  //     })
  //     .addCase(getUsers.rejected, (state, action) => {
  //       state.status = "failed";
  //     });
  // },
});

export const { actions } = userSlice;
// memoized selectors
export const userSelectors = usersAdapter.getSelectors((state) => state.users);
// the getSelectors method will return 5 selectors:
// selectAll - maps over state.ids array and return an array of entities
// selectIds - returns state.ids array
// selectTotal - returns total # of entities stored in this state
// selectById - given the state & entity ID, return the entity with that ID or undefined
// selectEntities - returns state.entities lookup table

export const userReducer = userSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// const postProductsAdapter = createEntityAdapter();
// console.log(postProductsAdapter);

// const initialState = postProductsAdapter.getInitialState({
//   status: "idle",
// });

export const getPosts = createAsyncThunk(
  //action type string
  "posts/getPosts",
  // action payload creator callback function
  async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      return data; // remember to return
    } catch (err) {
      console.log(err);
    }
  }
);

// export const postSlice = createSlice({
//   name: "posts",
//   initialState: {
//     posts: [],
//     status: "idle",
//   },
//   reducers: {},
//   extraReducers: {
//     [getPosts.pending]: (state, action) => {
//       state.loading = true;
//       state.status = "loading";
//     },
//     [getPosts.fulfilled]: (state, action) => {
//       state.posts = action.payload;
//       state.loading = false;
//       state.status = "succeeded";
//     },
//     [getPosts.rejected]: (state, action) => {
//       state.status = "failed";
//     },
//   },
// });

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        // state.loading = true;
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        // state.loading = false;
        state.status = "succeeded";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const postReducer = postSlice.reducer;

// using memoized selectors from createEntityAdapter
// export const { selectAll: selectPosts, selectById: selectPostsById } =
//   postAdapter.getSelectors((state) => state)

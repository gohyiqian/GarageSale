import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
// import axios from "axios";

const productsAdapter = createEntityAdapter();

export const getPosts = createAsyncThunk(
  "posts/getPosts", //action type string
  // action payload creator callback function
  async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=9");
      //   console.log(res);
      let data = await res.json();
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// AXIOS
// export const getPosts = createAsyncThunk("posts/getPosts", async () => {
//   try {
//     const res = await axios.get("https://fakestoreapi.com/products");
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// });

export const productSlice = createSlice({
  name: "posts",
  initialState: {
    products: [],
    status: "idle",
  },
  reducers: {
    productAddOne: productsAdapter.addOne,
    productAddMany: productsAdapter.addMany,
    productUpdate: productsAdapter.updateOne,
    productRemove: productsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        // state.loading = true;
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.products = action.payload;
        // state.loading = false;
        state.status = "success";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { actions } = productSlice;
// memoized selectors
// the getSelectors method will return 5 selectors:
// selectAll - maps over state.ids array and return an array of entities
// selectIds - returns state.ids array
// selectTotal - returns total # of entities stored in this state
// selectById - given the state & entity ID, return the entity with that ID or undefined
// selectEntities - returns state.entities lookup table
export const productSelectors = productsAdapter.getSelectors(
  (state) => state.products
);
export const productReducer = productSlice.reducer;

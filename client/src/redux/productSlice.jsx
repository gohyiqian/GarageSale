import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const productsAdapter = createEntityAdapter();

export const getNFTs = createAsyncThunk(
  "products/getNFTs", //action type string
  // action payload creator callback function
  async () => {
    try {
      const res = await fetch(
        "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20"
      );
      //   console.log(res);
      let data = await res.json();
      // console.log(data);
      return data["assets"];
    } catch (err) {
      console.log(err);
    }
  }
);

// AXIOS
export const getProduct = createAsyncThunk("posts/getPosts", async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/products");
    console.log(res.data);
    return res.data["products"];
  } catch (err) {
    console.log(err);
  }
});

export const productSlice = createSlice({
  name: "posts",
  initialState: {
    products: [],
    nfts: [],
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
      .addCase(getProduct.pending, (state) => {
        // state.loading = true;
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        // state.loading = false;
        state.status = "success";
      })
      .addCase(getProduct.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getNFTs.pending, (state) => {
        // state.loading = true;
        state.status = "loading";
      })
      .addCase(getNFTs.fulfilled, (state, action) => {
        state.nfts = action.payload;
        // state.loading = false;
        state.status = "success";
      })
      .addCase(getNFTs.rejected, (state) => {
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

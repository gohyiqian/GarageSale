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
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await axios.get("/api/products");
      // console.log(res.data);
      console.log(res.data["products"]);
      return res.data["products"];
    } catch (err) {
      console.log(err);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: { reviews: [] },
    page: 1,
    pages: 1,
    nfts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    productDetailStart: (state) => {
      state.status = "loading";
    },
    productDetailSuccess: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    productDetailFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    productTopStart: (state) => {
      state.status = "loading";
    },
    productTopSuccess: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    productTopFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    productCreateStart: (state) => {
      state.status = "loading";
    },
    productCreateSuccess: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    productCreateFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    productUpdateStart: (state) => {
      state.status = "loading";
    },
    productUpdateSuccess: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    productUpdateFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    productDeleteStart: (state) => {
      state.status = "loading";
    },
    productDeleteSuccess: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    productDeleteFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    productAddOne: productsAdapter.addOne,
    productAddMany: productsAdapter.addMany,
    productUpdate: productsAdapter.updateOne,
    productRemove: productsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        // state.loading = true;
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        // state.loading = false;
        state.status = "success";
      })
      .addCase(getProducts.rejected, (state) => {
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

import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <Home />
      <hr />
      <ProductList />
      <hr />
      <Product />
      <hr />
      <Login />
      <hr />
      <Register />
      <hr />
      <Cart />
    </>
  );
};

export default App;

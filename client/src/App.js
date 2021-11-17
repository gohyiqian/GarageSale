import HomePage from "./pages/HomePage";
import ProductShowPage from "./pages/ProductShowPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CartCheckOutPage from "./pages/CartCheckOutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PostProductPage from "./pages/PostProductPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import { useSelector } from "react-redux";
import { createContext } from "react";
import AllUserPage from "./pages/AllUserPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const INITIAL_STATE = {
  user: localStorage.getItem("accessToken") || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

console.log(INITIAL_STATE);

const App = () => {
  const user = INITIAL_STATE.user;
  // const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/products/:category">
          <ProductCategoryPage />
        </Route>

        <Route path="/product/:id">
          <ProductShowPage />
        </Route>

        <Route path="/cart">
          <CartCheckOutPage />
        </Route>

        <Route path="/success">
          <PaymentSuccessPage />
        </Route>

        <DndProvider backend={HTML5Backend}>
          <Route path="/posts/product">
            <PostProductPage />
          </Route>
        </DndProvider>

        <Route path="/allusers">
          <AllUserPage />
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

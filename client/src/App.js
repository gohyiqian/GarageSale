import HomePage from "./pages/HomePage";
import ProductShowPage from "./pages/ProductShowPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CartCheckOutPage from "./pages/CartCheckOutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import { useSelector } from "react-redux";

const App = () => {
  const user = false;
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

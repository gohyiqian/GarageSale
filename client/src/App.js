import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AllUserPage from "./pages/AllUserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ShowProductPage from "./pages/ShowProductPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
// import ThreeJSProductPage from "./pages/ThreeJSProductPage";

const App = () => {
  const user = false;
  const cart = true;
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        {/* <Route path="/threejs" exact component={ThreeJSProductPage} /> */}
        <Route path="/cart" exact component={CartPage} />
        <Route path="/profile" exact component={AllUserPage} />
        <Route path="/product/:id" exact component={ShowProductPage} />
        <DndProvider backend={HTML5Backend}>
          <Route exact path="/" exact component={HomePage} />
          <Route path="/nftcart" exact component={ShoppingCartPage} />
          <Route path="/products/:category" exact component={CategoryPage} />
        </DndProvider>
      </Switch>
    </Router>
  );
};

export default App;

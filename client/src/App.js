import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import ShopNFTCartPage from "./pages/ShopNFTCartPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
// import AllUserPage from "./pages/AllUserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ShowProductPage from "./pages/ShowProductPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import CheckOutPage from "./pages/CheckOutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import AdminUsersListPage from "./pages/AdminUsersListPage";
import AdminUserEditPage from "./pages/AdminUserEditPage";
import AdminProductsListPage from "./pages/AdminProductsListPage";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import AdminOrderListsPage from "./pages/AdminOrderListsPage";
import UserShopPage from "./pages/UserShopPage";
// import ThreeJSProductPage from "./pages/ThreeJSProductPage";

const App = () => {
  const user = false;
  // const cart = true;
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <RegisterPage />}
        </Route>

        <Route path="/profile" component={UserProfilePage} />
        <Route path="/shipping" component={CheckOutPage} />
        <Route path="/order/:id" component={OrderCompletePage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/payment" component={PaymentPage} />
        {/* <Route path="/threejs" exact component={ThreeJSProductPage} /> */}
        <Route path="/cart" component={CartPage} />

        <Route path="/admin/allusers" component={AdminUsersListPage} />
        <Route path="/admin/user/:id/edit" component={AdminUserEditPage} />

        <Route path="/product/:id" component={ShowProductPage} />

        <Route path="/admin/productlist" component={AdminProductsListPage} />
        <Route
          path="/admin/product/:id/edit"
          component={AdminProductEditPage}
        />
        <Route path="/seller/shop" component={UserShopPage} />
        <Route path="/admin/orderlist" component={AdminOrderListsPage} />
        <DndProvider backend={HTML5Backend}>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/nftcart" component={ShopNFTCartPage} /> */}
          <Route path="/products/:category" component={CategoryPage} />
        </DndProvider>
      </Switch>
    </Router>
  );
};

export default App;

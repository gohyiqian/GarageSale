// import {
//   HashRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
import UserShopProfilePage from "./pages/UserShopProfilePage";
import UserShopPage from "./pages/UserShopPage";
import AllShopsPage from "./pages/AllShopsPage";
import ShopShowPage from "./pages/ShopShowPage";
import ThreeJSProductPage from "./pages/ThreeJSProductPage";
import ShopNFTCartPage from "./pages/ShopNFTCartPage";

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
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/shipping" component={CheckOutPage} />
        <Route path="/order/:id" component={OrderCompletePage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/threejs" exact component={ThreeJSProductPage} />
        <Route path="/cart" component={CartPage} />

        <Route path="/admin/allusers" component={AdminUsersListPage} />
        <Route path="/admin/user/:id/edit" component={AdminUserEditPage} />

        <Route path="/product/:id" component={ShowProductPage} />

        <Route path="/admin/productlist" component={AdminProductsListPage} />
        <Route
          path="/admin/product/:id/edit"
          component={AdminProductEditPage}
        />
        <Route path="/seller/shop/:id" component={ShopShowPage} />
        <Route path="/seller/myshop/:id" component={UserShopPage} />
        <Route path="/seller/shop" component={UserShopProfilePage} />
        <Route path="/allshops" component={AllShopsPage} />
        <Route path="/admin/orderlist" component={AdminOrderListsPage} />
        {/* <Route path="/nftcart" component={ShopNFTCartPage} /> */}
        <DndProvider backend={HTML5Backend}>
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route path="/nftcart" component={ShopNFTCartPage} />
          {/* <Route path="/:category" component={CategoryPage} /> */}
        </DndProvider>

        <Route path="/:category" component={CategoryPage} />
      </Switch>
    </Router>
  );
};

export default App;

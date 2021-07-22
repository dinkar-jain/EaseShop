import React from "react";
import ManageProducts from "./ManageProducts"
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Product from "./Product";
import Home from "./Home";
import ProductHome from "./ProductHome";
import UpdateProfile from "./UpdateProfile"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Cart from "./Cart";
import PlaceOrder from "./PlaceOrder";
import Sales from "./Sales";
import Orders from "./Orders";
import ErrorPage from "./ErrorPage";

const App = () => {
    return (
        <div>
            <NavBar />
            <div id="Content">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/Products" component={ProductHome}></Route>
                    <Route exact path="/Seller/ManageProducts" component={ManageProducts}></Route>
                    <Route exact path="/Products/:_id" component={Product}></Route>
                    <Route exact path="/Cart" component={Cart}></Route>
                    <Route exact path="/Seller/Sales" component={Sales}></Route>
                    <Route exact path="/Orders" component={Orders}></Route>
                    <Route exact path="/EditProfile" component={UpdateProfile}></Route>
                    <Route exact path="/SignIn" component={SignIn}></Route>
                    <Route exact path="/SignUp" component={SignUp}></Route>
                    <Route exact path="/PlaceOrder" component={PlaceOrder}></Route>
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </div>
    )
};

export default App
import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import LoginSignUp from "./pages/LoginSignUp";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from "react-router-dom";
import ManageProducts from "./pages/ManageProducts";

const App = () => {
    return (
        <div>
            <NavBar />
            <div id="Content">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/Profile" component={Profile}></Route>
                    <Route exact path="/product/:id" component={Product}></Route>
                    <Route exact path="/Products" component={Products}></Route>
                    <Route exact path="/SignIn" component={LoginSignUp}></Route>
                    <Route exact path="/seller/products" component={ManageProducts}></Route>
                    <Route exact path="/Cart" component={Cart}></Route>
                    <Route exact path="/Checkout" component={Checkout}></Route>
                    <Route exact path="/Orders" component={Orders}></Route>
                    <Route exact path="/Dashboard" component={Dashboard}></Route>
                    <Route component={ErrorPage} />
                </Switch>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
};

export default App
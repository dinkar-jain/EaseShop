import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOutAction } from "./Action";

const NavBar = () => {

    const Dispatch = useDispatch();
    var { SignInDetails } = useSelector(State => State.SignIn);
    if (SignInDetails) {
    }
    else {
        SignInDetails = {}
    }

    const SignOut = () => {
        Dispatch(SignOutAction(SignInDetails.Email))
    }

    return (
        <nav>
            <div id="NavBarBrandName">
                <Link to="/">EaseShop</Link>
            </div>
            <div id="NavBarSignIn">
                {SignInDetails.FirstName ?
                    <>
                        <h3 id="NavBarUserName">{SignInDetails.FirstName}</h3>
                        {SignInDetails.IsAdmin === true ?
                            <div id="dropdown-content">
                                <Link to="/EditProfile">Edit Profile</Link>
                                <Link to="/Seller/ManageProducts">Manage Products</Link>
                                <Link to="/Seller/Sales">Sales</Link>
                                <Link to="/Orders">Personal Orders</Link>
                                <Link to="#" onClick={SignOut}>Sign Out</Link>
                            </div> : <div id="dropdown-content">
                                <Link to="/EditProfile">Edit Profile</Link>
                                <Link to="/Orders">Orders</Link>
                                <Link to="#" onClick={SignOut}>Sign Out</Link>
                            </div>
                        }
                    </> : <Link to="/SignIn"><img src="https://png.pngtree.com/element_pic/16/11/07/bece203ed79990c886f026b17dfd4099.jpg" alt="Login" /></Link>}
            </div>
            <div id="NavBarCartOption">
                <Link to="/Cart"><h1>Cart</h1></Link>
            </div>
        </nav>
    )
};

export default NavBar

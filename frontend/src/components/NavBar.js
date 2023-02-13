import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {

    var { userInfo } = useSelector(state => state.signIn) || {};

    return (
        <nav style={{ zIndex: 101 }}>
            <div id="NavBarBrandName">
                <Link to="/">EaseShop</Link>
            </div>
            <div style={{ display: "flex", marginLeft: "auto" }}>
                <div id="NavBarCartOption">
                    <Link to="/Cart"><i style={{ color: "black" }} className="fa-regular fa-heart fa-xl"></i></Link>
                </div>
                <div id="NavBarSignIn">
                    {userInfo.name ?
                        <>
                            <Link to="/profile"><i style={{ paddingLeft: "10px", cursor: "pointer" }} className="fa-regular fa-user fa-lg"></i></Link>
                        </> : <Link style={{ fontWeight: 400, fontSize: "16px", paddingLeft: "10px" }} to="/SignIn"><i className="fa-solid fa-right-to-bracket fa-xl"></i></Link>}
                </div>
            </div>
        </nav>
    )
};

export default NavBar

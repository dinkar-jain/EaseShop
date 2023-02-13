import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cookie from "js-cookie";
import "../css/Sidebar.css"
import React from 'react'

const Sidebar = () => {
    const { userInfo } = useSelector(state => state.signIn) || {};

    const logout = async () => {
        cookie.remove("userInfo");
        window.location.replace(process.env.APP_URL)
    }

    return (
        <div style={{ height: "91vh", border: "1px solid #E4E4E7", borderTop: "0px", borderBottom: "0px", position: "sticky", top: "47px" }}>
            <div id='sidebar-div-2' style={{ padding: "36px 6vw 26px 2vw" }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ marginBottom: "1rem" }}>
                        <Link to="/profile" >
                            <img src='/img/icons/house.svg' alt="house" />
                            <span>
                                Home
                            </span>
                        </Link>
                    </li>
                    {
                        userInfo.isSeller ?
                            <li style={{ marginBottom: "1rem" }}>
                                <Link to="/dashboard">
                                    <img src='/img/icons/speedometer2.svg' alt="dashboard" />
                                    <span>
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            : null
                    }
                    <li style={{ marginBottom: "1rem" }}>
                        <Link to="/orders">
                            <img src='/img/icons/table.svg' alt="dashboard" />
                            <span>
                                Orders
                            </span>
                        </Link>
                    </li>
                    {
                        userInfo.isSeller ?
                            <li style={{ marginBottom: "1rem" }}>
                                <Link to="/seller/products">
                                    <img src='/img/icons/grid.svg' alt="dashboard" />
                                    <span>
                                        Products
                                    </span>
                                </Link>
                            </li>
                            : null
                    }
                    <li style={{ position: "absolute", bottom: "25px" }}>
                        <Link onClick={logout}>
                            <img src='/img/icons/box-arrow-left.svg' alt="dashboard" />
                            <span>
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul >
            </div >
        </div >
    )
}

export default Sidebar

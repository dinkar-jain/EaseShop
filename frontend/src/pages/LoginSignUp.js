import React from 'react'
import axios from '../Axios'
import "../css/LoginSignUp.css"
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { signInAction } from "../redux/actions/authActions";

const LoginSignUp = () => {

    const dispatch = useDispatch();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [isSeller, setIsSeller] = useState(false);

    const loginSubmit = async (e) => {
        e.preventDefault();
        const error = await dispatch(signInAction(loginEmail, loginPassword))
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post("/API/Users/SignUp", { name, email, password, isSeller })
        if (resp.data.message === "Account created successfully") {
            toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error(resp.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <i style={{ position: "absolute", marginLeft: "10px" }} className="fa-regular fa-envelope"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        <i style={{ position: "absolute", marginLeft: "10px" }} className="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    {/* <Link to="/password/forgot">Forget Password ?</Link> */}
                    <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form
                    className="signUpForm"
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                >
                    <div className="signUpName">
                        <i className="fa-regular fa-user" style={{ position: "absolute", marginLeft: "10px" }}></i>
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpEmail">
                        <i style={{ position: "absolute", marginLeft: "10px" }} className="fa-regular fa-envelope"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpPassword">
                        <i style={{ position: "absolute", marginLeft: "10px" }} className="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div>
                        <input type="checkbox" style={{
                            width: "20px",
                            marginTop: "2px",
                            marginRight: "10px"
                        }} onClick={() => setIsSeller(!isSeller)} />
                        <label style={{ fontSize: "12px", color: "gray" }}>
                            Want a seller account?
                        </label>
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" />
                </form>
            </div>
        </div>
    )

}

export default LoginSignUp

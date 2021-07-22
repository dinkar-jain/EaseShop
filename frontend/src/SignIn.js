import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignInAction } from "./Action";
import ErrorPage from "./ErrorPage";

const SignIn = () => {

    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const { error } = useSelector(State => State.SignIn);
    const dispatch = useDispatch()

    const SubmitHandler = () => {
        dispatch(SignInAction(Email, Password))
    }

    try {
        return (
            <>
                <div id="SignIn">
                    <div id="SignInMain">
                        <h1><b>Sign-In</b></h1><br />
                        {error ? error : null}  <br /> <br />
                        <h4>Email</h4>
                        <input onChange={(e) => SetEmail(e.target.value)}></input><br /><br />
                        <h4>Password</h4>
                        <input type="password" id="SignInMainPasswordField" onChange={(e) => SetPassword(e.target.value)}></input><br /><br />
                        <button id="SignInMainSignInButton" onClick={SubmitHandler}>Sign In</button><br /><br />
                        <h4>New To E-Shop?</h4><br />
                        <Link to="/SignUp"><button id="SignInMainCreateAccountButton">Create Account</button></Link>
                    </div>
                </div>
            </>
        )

    } catch (error) {
        return <ErrorPage />
    }
}

export default SignIn
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignUpAction } from "./Action";
import ErrorPage from "./ErrorPage";

const SignUp = () => {

    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [ReConfirm, SetReCofirm] = useState("");
    const [IsAdmin, SetIsAdmin] = useState("false");
    const { error } = useSelector(State => State.SignUp);
    const dispatch = useDispatch();

    const SubmitHandler = () => {
        dispatch(SignUpAction(FirstName, LastName, Email, Password, ReConfirm, IsAdmin));
    }

    const UpdateIsAdmin = () => {
        var CheckBox = document.getElementById("Seller");
        if (CheckBox.checked === true) {
            SetIsAdmin("true");
        }

        else {
            SetIsAdmin("false");
        }
    }

    try {
        return (
            <>
                <div id="SignUp">
                    <div id="SignUpMain">
                        <div id="SignUpMainSame">
                            {error ? error : null}
                            <h1 style={{ textAlign: "center", textTransform: "capitalize" }}><b>Sign Up</b></h1><br /><br />
                            <p style={{ textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>First Name</p>
                            <input placeholder="Enter First Name " onChange={(e) => SetFirstName(e.target.value)}></input><br /><br />
                            <p style={{ textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>Last Name</p>
                            <input placeholder="Enter Last Name " onChange={(e) => SetLastName(e.target.value)}></input><br /><br />
                            <p style={{ textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>Email</p>
                            <input className="SignUpMainSpecificField" placeholder="Enter Email" onChange={(e) => SetEmail(e.target.value)}></input><br /><br />
                            <p style={{ textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>Password</p>
                            <input type="password" className="SignUpMainSpecificField" placeholder="Enter Password" onChange={(e) => SetPassword(e.target.value)}></input><br /><br />
                            <p style={{ textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>Re-Enter Password</p>
                            <input type="password" placeholder="ReEnter Password" onChange={(e) => SetReCofirm(e.target.value)}></input><br /><br />
                        </div>
                        <input type="checkbox" name="Seller" id="Seller" onClick={UpdateIsAdmin} />
                        <label htmlFor="Seller"><b>Want To Be A Seller??</b></label><br /> <br />
                        <button style={{ textAlign: "center" }} onClick={SubmitHandler}>SIGN UP</button><br /><br /><br />
                        <p style={{ textDecoration: "none", textAlign: "center", textTransform: "capitalize", fontSize: "15px", paddingBottom: "1rem" }}>Already Have An Account? <br /><br /> <Link to="/SignIn">Sign-In</Link></p>
                    </div>
                </div>
            </>
        )

    } catch (error) {
        return <ErrorPage />
    }
}

export default SignUp
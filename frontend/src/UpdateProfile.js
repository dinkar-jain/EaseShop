import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdatePasswordAction, UpdateProfileAction } from "./Action";
import ErrorPage from "./ErrorPage";
const UpdateProfile = () => {

    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [PhoneNumber, SetPhoneNumber] = useState("");
    const [OldPassword, SetOldPassword] = useState("");
    const [NewPassword, SetNewPassword] = useState("");
    const [ReConfirmPassword, SetReConfirmPassword] = useState("");
    const [Address, SetAddress] = useState("");
    const [City, SetCity] = useState("");
    const [PostalCode, SetPostalCode] = useState("");
    const [Country, SetCountry] = useState("");

    const { SignInDetails } = useSelector(State => State.SignIn);
    const { UpdatePasswordDetails } = useSelector(State => State.UpdatePassword);
    const { error } = useSelector(State => State.UpdateProfile);

    const Dispatch = useDispatch();

    useEffect(() => {

        if (SignInDetails) {
            SetFirstName(SignInDetails.FirstName)
            SetLastName(SignInDetails.LastName)
            SetPhoneNumber(SignInDetails.PhoneNumber)
            SetAddress(SignInDetails.Address)
            SetCity(SignInDetails.City)
            SetPostalCode(SignInDetails.PostalCode)
            SetCountry(SignInDetails.Country)
        }

        return () => {
            //
        }
    }, [SignInDetails, SetFirstName, SetLastName])

    const UpdateDetails = () => {
        Dispatch(UpdateProfileAction(SignInDetails._id, FirstName, LastName, PhoneNumber, Address, City, PostalCode, Country))
    }

    const UpdatePassword = () => {
        Dispatch(UpdatePasswordAction(SignInDetails._id, OldPassword, NewPassword, ReConfirmPassword))
    }

    try {

        if (SignInDetails.FirstName === undefined) {
            return <ErrorPage />
        }

        return (
            <>
                <div id="EditProfile">
                    <div id="EditProfileMain">
                        <b><h2 style={{ fontSize: "1.5rem", fontWeight: 500 }}>Basic Details</h2></b><br />
                        {UpdatePasswordDetails ? UpdatePasswordDetails && error ? null : <p style={{ paddingBottom: "2.1rem" }} /> : null}
                        <div id="PasswordUpdate"><b>{error}</b></div>
                        <h4>First Name</h4>
                        <input onChange={(e) => SetFirstName(e.target.value)} value={FirstName}></input><br />
                        <h4>Last Name</h4>
                        <input onChange={(e) => SetLastName(e.target.value)} value={LastName}></input><br />
                        <h4>Address</h4>
                        <input onChange={(e) => SetAddress(e.target.value)} value={Address}></input><br />
                        <h4>Phone Number</h4>
                        <input onChange={(e) => SetPhoneNumber(e.target.value)} value={PhoneNumber}></input><br />
                        <h4>City</h4>
                        <input onChange={(e) => SetCity(e.target.value)} value={City}></input><br />
                        <h4>Postal Code</h4>
                        <input onChange={(e) => SetPostalCode(e.target.value)} value={PostalCode}></input><br />
                        <h4>Country</h4>
                        <input onChange={(e) => SetCountry(e.target.value)} value={Country}></input><br />
                        <div id="EditProfileMainButton" onClick={UpdateDetails}><button>Update</button></div>
                    </div><hr />
                    <div id="EditProfileMain"><b><h2 style={{ fontSize: "1.5rem", fontWeight: 500 }}>Password</h2></b><br />
                        {error ? UpdatePasswordDetails && error ? null : <p style={{ paddingBottom: "2.1rem" }} /> : null}
                        <div id="PasswordUpdate"><b>{UpdatePasswordDetails}</b></div>
                        <h4>Old Password</h4>
                        <input type="password" onChange={(e) => SetOldPassword(e.target.value)}></input><br />
                        <h4>New Password</h4>
                        <input type="password" onChange={(e) => SetNewPassword(e.target.value)}></input><br />
                        <h4>ReConfirm Password</h4>
                        <input type="password" onChange={(e) => SetReConfirmPassword(e.target.value)}></input><br />
                        <div id="EditProfileMainButton" onClick={UpdatePassword}><button>Update</button></div>
                    </div>
                </div>
            </>
        )

    } catch (error) {
        return <ErrorPage />
    }
}

export default UpdateProfile
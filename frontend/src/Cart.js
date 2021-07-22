import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CartDeleteDetailsAction } from "./Action";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";

const Cart = () => {

    const { CartDetails } = useSelector(state => state.CartDetails);
    var { SignInDetails } = useSelector(State => State.SignIn);
    const Products = CartDetails;

    const Dispatch = useDispatch();

    const Proceed = () => {
        if (Products.length === 0) {
            alert("Cart Is Empty");
        }

        else if (SignInDetails.Address === undefined || SignInDetails === undefined) {
            window.location.replace("http://localhost:3000/SignIn")
        }

        else if (SignInDetails.Address === "" || SignInDetails.PhoneNumber === null) {
            window.location.replace("http://localhost:3000/EditProfile")
        }

        else {
            window.location.replace("http://localhost:3000/PlaceOrder")
        }
    }

    try {
        return (
            <div id="Cart">
                <div id="CartHeadings">
                    <h2>Shopping Cart</h2>
                    <h3>Price</h3>
                </div>
                <hr></hr>
                <div id="CartDetails">
                    {Products.length === 0 ? "Cart Is Empty" : Products.map(Product =>
                        <h4 key={Product._id}>
                            <div id="CartDetailsMain">
                                <div><img src={Product.Image} alt="" /></div>
                                <div id="CartDetailsMainDetail">
                                    <div id="CartDetailsMainDetailPrice">
                                        <h3><Link to={'/Products/' + Product._id}>{Product.Name}</Link></h3>
                                        <h2>₹{Product.Price * Product.Qty}</h2>
                                    </div>
                                    <h3>Qty: {Product.Qty}</h3>
                                    <div id="DeleteButton">
                                        <button style={{ backgroundColor: "#ff8457", color: "white", textDecoration: "none", border: "1px solid", textTransform: "uppercase", fontWeight: 500, borderRadius: "10px" }} onClick={() => {
                                            Dispatch(CartDeleteDetailsAction(Product._id));
                                        }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <hr /><br />
                        </h4>
                    )
                    }<br /><br />
                    <div id="SubTotal">
                        <h3>SubTotal:</h3>
                        <h2>₹{Products.reduce((Actual, Current) => Actual + Current.Price * Current.Qty, 0)}</h2>
                    </div>
                    <div id="SubmitButton">
                        <button onClick={Proceed}><h4>Proceed To Checkout</h4></button>
                    </div>
                </div>
            </div>
        )

    } catch (error) {
        return <ErrorPage />
    }
}

export default Cart
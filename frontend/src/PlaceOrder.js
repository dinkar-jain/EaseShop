import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { OrderCreateAction } from "./Action";
import ErrorPage from "./ErrorPage";

const PlaceOrder = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const CurrentDate = mm + '/' + dd + '/' + yyyy;

    const { SignInDetails } = useSelector(State => State.SignIn);
    const { CartDetails } = useSelector(state => state.CartDetails);

    var Total = CartDetails.reduce((Actual, Current) => Actual + Current.Price * Current.Qty + Current.Price * Current.Qty * 18 / 100 + 100, 0);
    var Name = SignInDetails.FirstName + " " + SignInDetails.LastName;
    var Address = SignInDetails.Address + ", " + SignInDetails.City + ", " + SignInDetails.PostalCode;

    const Dispatch = useDispatch();

    const Proceed = () => {
        Dispatch(OrderCreateAction(CurrentDate, SignInDetails._id, Name, Address, CartDetails))
        window.location.replace("http://localhost:3000/Orders")
    }

    try {

        if (SignInDetails.FirstName === undefined) {
            return <ErrorPage />
        }

        return (
            <div id="PlaceOrder">
                <div id="LeftPart">
                    <div id="Address">
                        <h3>Shipping</h3><br />
                        <strong>Name: </strong>{Name}<br />
                        <strong>Address: </strong>{Address}
                    </div>
                    <div id="OrderingProducts">
                        <h3>Order Items</h3><br />
                        {CartDetails.map(Product =>
                            <h4 key={Product._id}>
                                <div id="OrderingProductsSingle">
                                    <div id="OrderingProductSingleImage">
                                        <img src={Product.Image} alt="" />
                                    </div>
                                    <div id="OrderingProductSingleName">{Product.Name}<br />Size: {Product.Size}</div>
                                    <div>
                                        {Product.Qty} x ₹{Product.Price} = ₹{Product.Price * Product.Qty}
                                    </div>
                                </div>
                                <hr /><br />
                            </h4>
                        )}
                    </div>
                </div>
                <div id="RightPart">
                    <div>
                        <h3>Order Summary</h3><br />
                        <h4>Items: ₹{CartDetails.reduce((Actual, Current) => Actual + Current.Price * Current.Qty, 0)}</h4>
                        <h4>Shipping: ₹100</h4>
                        <h4>Tax: ₹{CartDetails.reduce((Actual, Current) => Actual + Current.Price * Current.Qty * 18 / 100, 0)}</h4>
                        <h4><strong>Order Total: ₹{Math.round(Total)}</strong></h4><br />
                        <button onClick={Proceed}>Place Order</button>
                    </div>
                </div>
            </div >
        )

    } catch (error) {
        return <ErrorPage />
    }
}

export default PlaceOrder;
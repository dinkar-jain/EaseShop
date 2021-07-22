import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { OrderDeleteAction, OrdersDataAction } from "./Action";
import ErrorPage from "./ErrorPage";

const Orders = () => {

    const [Visibility, SetVisibility] = useState(false);
    const [SpecificOrder, SetSpecificOrder] = useState();

    var { SignInDetails } = useSelector(State => State.SignIn);
    var Name = SignInDetails.FirstName + " " + SignInDetails.LastName;
    var Address = SignInDetails.Address + ", " + SignInDetails.City + ", " + SignInDetails.PostalCode;

    const User_id = SignInDetails._id;

    const Dispatch = useDispatch();
    useEffect(() => {

        Dispatch(OrdersDataAction(User_id));

        return () => {
            //
        }
    }, [Dispatch, User_id])

    const { Orders } = useSelector(state => state.OrdersData);
    const Order = Orders || []

    const DeleteHandler = (Order_id) => {
        Dispatch(OrderDeleteAction(Order_id));
        window.location.reload(false);
    }

    try {

        if (SignInDetails.FirstName === undefined) {
            return <ErrorPage />
        }

        return (
            <>
                {Visibility ?
                    <div id="PlaceOrder">
                        <div id="LeftPart">
                            <div id="Address">
                                <h3>Shipping</h3><br />
                                <strong>Name: </strong>{Name}<br />
                                <strong>Address: </strong>{Address}
                            </div>
                            <div id="OrderingProducts">
                                <h3>Order Items</h3><br />
                                {SpecificOrder.map(Product =>
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
                                <h4>Items: ₹{SpecificOrder.reduce((Actual, Current) => Actual + Current.Price * Current.Qty, 0)}</h4>
                                <h4>Shipping: ₹100</h4>
                                <h4>Tax: ₹{SpecificOrder.reduce((Actual, Current) => Actual + Current.Price * Current.Qty * 18 / 100, 0)}</h4>
                                <h4><strong>Order Total: ₹{SpecificOrder.reduce((Actual, Current) => Actual + Current.Price * Current.Qty + Current.Price * Current.Qty * 18 / 100 + 100, 0)}</strong></h4><br />
                                <button onClick={function () { SetVisibility(false) }}>Back</button>
                            </div>
                        </div>
                    </div > :
                    <div id="Orders" style={{ overflowX: "auto" }}>
                        <h3>Order History</h3><br />
                        <table>
                            <thead>
                                <tr>
                                    <th>_id </th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Dispatch</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Order.map(Order =>
                                    <tr key={Order._id}>
                                        <td>{Order._id}</td>
                                        <td>{Order.Date}</td>
                                        <td>{Order.Details.reduce((Actual, Current) => Actual + Current.Price * Current.Qty + Current.Price * Current.Qty * 18 / 100 + 100, 0)}</td>
                                        <td>{Order.Paid ? "COD" : "Paid"}</td>
                                        <td>{Order.Delivered}</td>
                                        <td>
                                            <button onClick={function () { SetVisibility(true); const { Details } = Order; SetSpecificOrder(Details); }}> Details</button>
                                            {Order.Delivered === "Yes" ? null : <button onClick={function () { DeleteHandler(Order._id) }}>Cancel Order</button>}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>}
            </>
        )

    } catch (error) {
        return <ErrorPage />
    }

}

export default Orders
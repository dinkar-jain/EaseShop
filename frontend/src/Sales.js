import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { OrdersDispatchAction, SalesDataAction } from "./Action";
import ErrorPage from "./ErrorPage";

const Sales = () => {

    var { SignInDetails } = useSelector(State => State.SignIn);
    const { Orders } = useSelector(state => state.SalesData);

    const User_id = SignInDetails._id;
    const [Name, SetName] = useState("");
    const [Address, SetAddress] = useState("");
    const [SpecificOrder, SetSpecificOrder] = useState();
    const [Visibility, SetVisibility] = useState(false);

    const Dispatch = useDispatch();
    useEffect(() => {

        Dispatch(SalesDataAction());

        return () => {
            //
        }
    }, [Dispatch])

    try {

        if (!SignInDetails.IsAdmin) {
            return <ErrorPage />
        }

        return (
            <>
                {Visibility ?
                    <div id="PlaceOrder">
                        <div id="LeftPart" style={{ width: "100%" }}>
                            <div id="Address">
                                <h3>Shipping</h3><br />
                                <strong>Name: </strong>{Name}<br />
                                <strong>Address: </strong>{Address}
                            </div>
                            <div id="OrderingProducts">
                                <h3>Order Items</h3><br />
                                {SpecificOrder.map(Product =>
                                    Product.Seller_id === User_id ?
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
                                            <div style={{ textAlign: "center" }}>
                                                <button style={{ cursor: "pointer", padding: "5px", outlineStyle: "none", backgroundColor: "orange", borderRadius: "10px", borderColor: "orange", width: "80px" }} onClick={function () { SetVisibility(false) }}>Back</button>
                                            </div>
                                        </h4> : null
                                )}
                            </div>
                        </div>
                    </div > :
                    <div id="Orders" style={{ overflowX: "auto" }}>
                        <h3>Orders</h3><br />
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
                                {Orders.map(Order =>
                                    Order.Details.reduce((Actual, Current) => Current.Seller_id === User_id ? Actual + Current.Price * Current.Qty : Actual + 0, 0) > 0 ?
                                        <tr key={Order._id}>
                                            <td>{Order._id}</td>
                                            <td>{Order.Date}</td>
                                            <td>{Order.Details.reduce((Actual, Current) => Current.Seller_id === User_id ? Actual + Current.Price * Current.Qty : Actual + 0, 0)}</td>
                                            <td>{Order.Paid ? "COD" : "Paid"}</td>
                                            <td>{Order.Delivered}</td>
                                            <td>
                                                <button onClick={function () { SetVisibility(true); SetName(Order.Name); SetAddress(Order.Address); const { Details } = Order; SetSpecificOrder(Details); }}> Details</button>
                                                {Order.Delivered === "Yes" ? null : <button onClick={function () { Dispatch(OrdersDispatchAction(Order._id)); Dispatch(SalesDataAction()) }}> Dispatch</button>}
                                            </td>
                                        </tr>
                                        : null
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

export default Sales
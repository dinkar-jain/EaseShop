import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartUpdateDetailsAction, ProductDetailsAction } from "./Action";
import ErrorPage from "./ErrorPage";

const Product = (props) => {
    const [Qty, UpdateQty] = useState(1);
    const { ProductDetails } = useSelector((state) => state.AdminProduct);
    const Product = ProductDetails || { id: "" };

    var { SignInDetails } = useSelector(State => State.SignIn);
    const User_id = SignInDetails._id;

    const Dispatch = useDispatch();

    useEffect(() => {

        Dispatch(ProductDetailsAction(props.match.params._id));

        return () => {
            //
        }
    }, [Dispatch, props])

    try {

        if (Product._id === props.match.params._id) {

            return (
                <>
                    <div id="Product">
                        <div id="ProductImage">
                            <img src={Product.Image} alt=""></img>
                        </div>
                        <div id="ProductInformation">
                            <p style={{ fontSize: "25px", fontWeight: 600 }}>{Product.Name}</p><br />
                            <p style={{ fontSize: "18px", fontWeight: 600 }}>Size: {Product.Size}</p><br />
                            <p style={{ fontSize: "18px", fontWeight: 1, textAlign: "justify" }}>{Product.Description}</p><br />
                        </div>
                        <div id="ProductCart">
                            <div id="ProductCartBox">
                                <p style={{ fontSize: "20px", fontWeight: 600 }}>Price: <span style={{ color: "red" }}>₹{Product.Price}</span></p><br></br>
                                <p style={{ fontSize: "20px", fontWeight: 600 }}>State: {Product.Stock > 0 ? <span style={{ color: "green" }}> InStock </span> : <span style={{ color: "red" }}> Out Of Stock </span>}</p><br></br>
                                <p style={{ fontSize: "20px", fontWeight: 600 }}>Qty: <select value={Qty} onChange={(e) => { UpdateQty(e.target.value) }}>
                                    {[...Array(Product.Stock).keys()].map(x =>
                                        x < 5 ? <option value={x + 1} key={x + 1}>{x + 1}</option> : null
                                    )}
                                </select></p><br></br>
                                {Product.Stock > 0 && <button onClick={function () { return (Product.Seller_id !== User_id ? Dispatch(CartUpdateDetailsAction(props.match.params._id, Qty), alert("Product Added To Cart")) : alert("Can't Order Self Products")) }}>Add To Cart</button>}
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        else if (Product._id === undefined) {
            Dispatch(ProductDetailsAction(props.match.params._id));
            return "";
        }

        else {
            return <ErrorPage />
        }

    } catch (error) {
        return <ErrorPage />
    }
}

export default Product
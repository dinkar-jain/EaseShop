import { deleteFromCartAction, updateCartItemAction } from "../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import React from 'react'
import "../css/Cart.css";

const Cart = () => {
    const { cart } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.signIn) || {};

    const dispatch = useDispatch();

    const removeItem = async (id, size) => {
        const resp = await dispatch(deleteFromCartAction(id, size));
        if (resp) {
            toast.success("Removed from cart", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error("Some error occured", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const checkout = () => {
        if (Object.keys(userInfo).length === 0) {
            toast.error("Please sign in to checkout", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (cart.length === 0) {
            toast.error("Cart is empty", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            window.location.href = "/checkout";
        }
    }

    return (
        <div className="cart">
            <h2 style={{ fontWeight: "bold" }}>Shopping Cart</h2>
            <div style={{ width: "3%", height: "3px", backgroundColor: "rgb(254, 141, 102)", margin: "10px 0px 30px 0px" }}></div>
            <div className="cartMain">
                <div className="cartMainLeft">
                    <hr />
                    {
                        cart.length === 0 ? <h3 style={{ marginTop: "1rem", color: "rgb(254, 141, 102)" }}>Cart Is Empty</h3> : cart.map(product => {
                            return (
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                                        <div className="cartMainLeftProduct">
                                            <div style={{ display: "flex", marginRight: "2rem", }}>
                                                <img src={product.image} alt="product" style={{ width: "120px" }} />
                                                <div style={{ marginLeft: "20px", position: "relative" }}>
                                                    <div style={{ font: "700 16px open_sansregular" }}>{product.name}</div>
                                                    <div style={{ font: "300 14px open_sansregular", color: "#888" }}>Size: {product.size}</div>
                                                    <div className="cartMainLeftProductInStock" style={{ font: "300 14px open_sansregular", color: "#888" }}>In Stock</div>
                                                    <div style={{ font: "300 14px open_sansregular", color: "#888", position: "absolute", bottom: "0px" }}>
                                                        <button onClick={() => removeItem(product._id, product.size)} style={{ border: "none", backgroundColor: "transparent", color: "#888", cursor: "pointer" }}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cartMainLeftProductEachPrice">
                                                <div style={{ font: "700 14px open_sansregular" }}>Each</div>
                                                <div style={{ font: "600 14px open_sansbold", marginTop: '0.2rem' }}>{`$${product.price}.00`}</div>
                                            </div>
                                            <div>
                                                <div style={{ font: "700 14px open_sansregular" }}>Quantity</div>
                                                <div style={{ display: "flex", alignItems: "center", marginTop: '0.2rem' }}>
                                                    <select value={product.quantity} onChange={(e) => {
                                                        dispatch(updateCartItemAction(product._id, { quantity: e.target.value }))
                                                    }} name="quantity" id="quantity" style={{ width: "100%", height: "30px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "0.5rem" }}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ font: "700 14px open_sansregular" }}>Total</div>
                                                <div style={{ font: "600 14px open_sansbold", marginTop: '0.2rem' }}>{`$${product.price * product.quantity}.00`}</div>
                                            </div>
                                        </div>
                                    </div >
                                    < hr style={{ marginTop: "1rem" }} />
                                </>
                            )
                        })
                    }
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.3rem", marginBottom: "0.3rem" }}>
                        <p style={{ marginLeft: "auto", marginRight: "0.8rem" }}><b>Gross Total:</b></p>
                        <p><b>{`₹${cart.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}</b></p>
                    </div>
                </div >
                <div className="cartMainRight">
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0px" }}>
                        <h4 style={{ font: "300 15px cursive", color: "rgba(24, 24, 24, 0.815)" }}>Price Details</h4>
                        <p style={{ font: "300 15px Roboto" }}>({cart.length} items)</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                        <p style={{ font: "300 15px Roboto" }}>Price ({cart.length} items)</p>
                        <p style={{ font: "300 15px Roboto" }}>{`₹${cart.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                        <p style={{ font: "300 15px Roboto" }}>Delivery Charges</p>
                        <p style={{ font: "300 15px Roboto" }}>FREE</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                        <p style={{ font: "300 15px Roboto" }}><b>Total Amount</b></p>
                        <p style={{ font: "300 15px Roboto" }}><b>{`₹${cart.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}</b></p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
                        <button onClick={checkout} style={{ border: "none", backgroundColor: "#f1e04a", padding: "0.5vmax", cursor: "pointer", color: "black", transition: "all 0.5s", width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 L 4 8 L 4 22 L 20 22 L 20 8 L 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" /></svg>
                            <b style={{ fontSize: "16px", marginLeft: "0.3rem" }}>Checkout</b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

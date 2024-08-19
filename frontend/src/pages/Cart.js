import { deleteFromCartAction, updateCartItemAction } from "../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import React from 'react'
import "../css/Cart.css";

const Cart = () => {
    const { cart } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.signIn) || {};

    const dispatch = useDispatch();

    const orderFeatures = [
        {
            title: 'Secure Checkout',
            icon: '/img/icons/secure_checkout_border_cart.svg'
        },
        {
            title: 'Easy returns & exchanges',
            icon: '/img/icons/easy_returns_cart.svg'
        },
        {
            title: 'Free shipping',
            icon: '/img/icons/free_shipping_cart.svg'
        }
    ]

    const removeItem = async (id, size) => {
        try {
            dispatch(deleteFromCartAction(id, size));
        } catch (error) {
            console.log(error);
        }
    };

    const checkout = () => {
        if (!userInfo || Object.keys(userInfo).length === 0) {
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
        else {
            window.location.href = "/checkout";
        }
    }

    return (
        <>
            {
                cart.length === 0 ?
                    <div style={{ display: "flex", alignItems: "center", minHeight: "94vh", flexDirection: "column", backgroundColor: "#f6f7f7" }}>
                        <img src="/img/icons/shopping_bag_icon.svg" alt="empty cart" style={{ width: "170px", marginTop: "5rem" }} />
                        <h2 style={{ fontSize: '21px', width: '70%', textAlign: "center" }}>Your shopping cart is empty</h2>
                        <p style={{ fontSize: '14px', width: '70%', textAlign: "center", marginTop: "10px", marginBottom: "20px" }}>Start filling up your bag!</p>
                        <Link to="/" style={{ display: 'block', textDecoration: 'none', color: '#fff', background: '#000', width: '240px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', padding: '18px 0 16px', textAlign: 'center', marginBottom: '5px', textTransform: 'uppercase', cursor: 'pointer', border: '1px solid #000' }}>Continue Shopping</Link>
                    </div>
                    :
                    <div className="cartMain">
                        <div className="cartMainLeft">
                            <h2 style={{ fontWeight: "bold" }}>Shopping Cart</h2>
                            <div style={{ width: "3%", height: "3px", backgroundColor: "rgb(254, 141, 102)", margin: "10px 0px 30px 0px" }}></div>
                            {cart.map(product => {
                                return (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #dedede" }}>
                                            <img src={product.image} alt="product" style={{ width: "20%", marginRight: "20px" }} />
                                            <div style={{ width: "100%" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div>
                                                        <div style={{ fontSize: '14px', color: '#333', textTransform: 'capitalize', lineHeight: '1.5' }}>
                                                            {product.name}
                                                        </div>
                                                        <div style={{ fontSize: '14px', color: '#333', textTransform: 'capitalize', lineHeight: '1.5', marginBottom: '15px' }}>
                                                            Size: {product.size}
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#000', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Quantity</div>
                                                        <select value={product.quantity} onChange={(e) => {
                                                            dispatch(updateCartItemAction(product._id, { quantity: e.target.value }))
                                                        }} name="quantity" id="quantity" style={{ width: "100%", height: "30px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "0.5rem" }}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#000' }}>
                                                        {`$${product.price * product.quantity}.00`}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div></div>
                                                    <button onClick={() => removeItem(product._id, product.size)} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", display: 'flex', alignItems: 'center' }}>
                                                        <img alt="Remove" src="/img/icons/delete_icon_grey.svg" />
                                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#888', textTransform: 'uppercase' }}>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div >
                                    </>
                                )
                            })}
                        </div >
                        <div className="cartMainRight">
                            <div className="cartMainRightInner">
                                <div style={{ display: "flex", gap: "4", alignItems: "center" }}>
                                    <img src="/img/icons/order_icon_black.svg" alt="order" style={{ height: "2.5rem" }} />
                                    <div style={{ fontSize: "21px", fontWeight: 700, color: "black", textTransform: "uppercase" }}>Order Summary</div>
                                </div>
                                <div style={{ boxShadow: "0 2px 5px 0 rgba(0,0,0,.1)", background: "#fff", borderRadius: "10px", paddingTop: "16px", paddingBottom: "20px", marginTop: "12px", fontSize: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', padding: '0 25px', fontWeight: '700' }}>
                                        <div>Price ({cart.length} items)</div>
                                        <div>{`$${cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', padding: '0 25px', }}>
                                        <div>Shipping</div>
                                        <div>Free</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: "1px solid #dcdcdc", padding: '16px 25px', fontWeight: '700' }}>
                                        <div>
                                            Payable Amount
                                            <p style={{ fontWeight: '400', color: '#888' }}>(Includes Tax)</p>
                                        </div>
                                        <div>{`$${cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</div>
                                    </div>
                                    <div style={{ padding: '0 20px', marginTop: '20px' }}>
                                        <button onClick={checkout} style={{ border: "none", backgroundColor: "black", padding: "13px 20px 14px", cursor: "pointer", color: "white", width: "100%", borderRadius: "10px" }}>
                                            <b style={{ textTransform: "uppercase" }}>Checkout</b>
                                        </button>
                                    </div>
                                </div>
                                <div style={{ boxShadow: '0 2px 5px 0 rgba(0,0,0,.1)', background: '#fff', borderRadius: '10px', paddingTop: '16px', paddingBottom: '20px', margin: '40px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {orderFeatures.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
                                            <img src={item.icon} alt={item.title} style={{ marginBottom: "12px" }} />
                                            <p style={{ fontSize: '13px', letterSpacing: '.07px', textAlign: "center" }}>
                                                {item.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div >
            }
        </>
    )
}

export default Cart

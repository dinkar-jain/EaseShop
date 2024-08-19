// Cancel Order

import React from 'react'
import "../css/Order.css"

const Order = (props) => {
    const [order, setOrder] = React.useState(props.order)
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", position: "fixed", top: 0, left: 0, zIndex: 101, background: "#00000080", width: "100%", height: "100%", overflow: "auto" }}>
                <div id='order-overlay' style={{ width: "60%", height: "80%", marginTop: "2.5rem", background: "#F4F4F6", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)", overflow: "scroll" }}>
                    {
                        order.orderItems ?
                            <div id='order'>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <h2 style={{ color: "#354050", marginBottom: "5px" }}>Your Order</h2>
                                    <div onClick={() => props.setOrder(undefined)} style={{ marginLeft: "auto", width: "fit-content" }}>
                                        <svg id='closeBtn' width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.0938 19.6523C21.6914 20.3164 21.6914 21.3125 21.0938 21.9102C20.4297 22.5742 19.4336 22.5742 18.8359 21.9102L11 14.0078L3.09766 21.9102C2.43359 22.5742 1.4375 22.5742 0.839844 21.9102C0.175781 21.3125 0.175781 20.3164 0.839844 19.6523L8.74219 11.75L0.839844 3.84766C0.175781 3.18359 0.175781 2.1875 0.839844 1.58984C1.4375 0.925781 2.43359 0.925781 3.03125 1.58984L11 9.55859L18.9023 1.65625C19.5 0.992188 20.4961 0.992188 21.0938 1.65625C21.7578 2.25391 21.7578 3.25 21.0938 3.91406L13.1914 11.75L21.0938 19.6523Z" fill="#A6A6A6" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div class="hh-grayBox">
                                        <div style={{ display: "flex" }}>
                                            <div class="order-tracking completed">
                                                <span class="is-complete"></span>
                                                <p>Ordered<br /><span>
                                                    {
                                                        new Date(order.date).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })
                                                    }
                                                </span></p>
                                            </div>
                                            <div class={
                                                order.dispatchedDate ?
                                                    "order-tracking completed"
                                                    :
                                                    "order-tracking"
                                            }>
                                                <span class="is-complete"></span>
                                                <p>Shipped<br /><span>
                                                    {
                                                        order.dispatchedDate ?
                                                            new Date(order.dispatchedDate).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })
                                                            :
                                                            order.deliveryMethod === "Standard" ?
                                                                new Date(
                                                                    new Date().getTime() + 3 * 24 * 60 * 60 * 1000
                                                                ).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                                :
                                                                new Date(
                                                                    new Date().getTime() + 2 * 24 * 60 * 60 * 1000
                                                                ).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                    }
                                                </span></p>
                                            </div>
                                            <div class={
                                                order.dispatchedDate &&
                                                    new Date(order.dispatchedDate).getTime() + 24 * 60 * 60 * 1000 < new Date().getTime()
                                                    ?
                                                    "order-tracking completed"
                                                    :
                                                    "order-tracking"
                                            }>
                                                <span class="is-complete"></span>
                                                <p>Delivered<br /><span>
                                                    {
                                                        order.dispatchedDate ?
                                                            new Date(
                                                                new Date(order.dispatchedDate).getTime() + 24 * 60 * 60 * 1000
                                                            ).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })
                                                            :
                                                            order.deliveryMethod === "Standard" ?
                                                                new Date(
                                                                    new Date().getTime() + 6 * 24 * 60 * 60 * 1000
                                                                ).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                                :
                                                                new Date(
                                                                    new Date().getTime() + 4 * 24 * 60 * 60 * 1000
                                                                ).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                    }
                                                </span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id='orderOverview'>
                                    <div style={{ margin: "1rem" }}>
                                        <div style={{ color: "#354050" }}>Order Number</div>
                                        <div style={{ color: "#79879A" }}>{order._id}</div>
                                    </div>
                                    <div style={{ margin: "1rem" }}>
                                        <div style={{ color: "#354050" }}>Date</div>
                                        <div style={{ color: "#79879A" }}>
                                            {
                                                new Date(order.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div style={{ margin: "1rem" }}>
                                        <div style={{ color: "#354050" }}>Total</div>
                                        <div style={{ color: "#79879A" }}>
                                            ${(order.orderItems.reduce((a, c) => a + c.price * c.quantity, 0)) + + Math.round(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18) + (order.deliveryMethod === "Standard" ? 0 : 5)}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ border: "1px solid #D0D5DC", padding: "0.5rem 0rem" }}>
                                    <div id='orderDetails'>
                                        <div id='orderDetailsLeft'>
                                            <hr />
                                            {
                                                order.orderItems.map(product => {
                                                    return (
                                                        <>
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", overflow: "scroll" }}>
                                                                <div className="cartMainLeftProduct">
                                                                    <div style={{ display: "flex", marginRight: "2rem", }}>
                                                                        <img src={product.image} alt="product" style={{ width: "100px" }} />
                                                                        <div style={{ marginLeft: "20px", position: "relative" }}>
                                                                            <div style={{ font: "700 16px open_sansregular" }}>{product.name}</div>
                                                                            <div style={{ font: "300 14px open_sansregular", color: "#888" }}>Size: {product.size}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cartMainLeftProductEachPrice">
                                                                        <div style={{ font: "700 14px open_sansregular" }}>Each</div>
                                                                        <div style={{ font: "600 14px open_sansbold", marginTop: '0.2rem' }}>{`$${product.price}.00`}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div style={{ font: "700 14px open_sansregular" }}>Quantity</div>
                                                                        <div style={{ font: "600 14px open_sansbold", marginTop: '0.2rem' }}>{`${product.quantity}`}</div>
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
                                        </div >
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default Order

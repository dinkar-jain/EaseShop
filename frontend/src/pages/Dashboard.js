import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from '../components/Sidebar'
import { useSelector } from "react-redux";
import Order from "../components/Order";
import { toast } from "react-toastify";
import "../css/Dashboard.css"
import axios from "axios";
import React from 'react'

const Dashboard = () => {
    let { userInfo } = useSelector(state => state.signIn) || {};

    const [pendingOrders, setPendingOrders] = React.useState([])
    const [order, setOrder] = React.useState(undefined)
    const [orders, setOrders] = React.useState([])
    const [data, setData] = React.useState([])

    const getOrders = () => {
        axios.get("/API/Sales", {
            headers: {
                'authorization': userInfo.token
            }
        })
            .then(res => {
                setOrders(res.data)
                setPendingOrders(res.data.filter(order => order.deliveryStatus === "Not Delivered"))
                setData(res.data.map(order => {
                    return {
                        name: new Date(order.date).toLocaleDateString(),
                        uv: order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                    }
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const dispatchOrder = async (order) => {
        await axios.post("/API/Orders/Dispatch", {
            id: order._id
        }, {
            headers: {
                'authorization': userInfo.token
            }
        })
            .then(res => {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getOrders()
            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getOrders()
    }, [])

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ background: "rgb(246, 247, 251)", padding: '30px 2vw', width: "100%", overflow: "scroll" }}>
                <div style={{ fontSize: '20px', margin: '0 0 5px', letterSpacing: '.025em' }}>Dashboard</div>
                <div style={{ fontSize: '13px', display: "flex" }}>
                    <div style={{ color: "#37474f", marginRight: "12px" }}>Home</div>
                    <div style={{ color: "#868e96", marginRight: "7px" }}>/</div>
                    <div style={{ color: "#868e96" }}>Dashboard</div>
                </div>
                <div id="dashboardBoxes">
                    <div id='dashboardBox1'>
                        <small>Wallet Balance</small>
                        <h4 style={{ fontSize: "1.5rem" }}>${
                            orders.reduce((acc, order) => {
                                return acc + order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                            }, 0).toFixed(2)
                        }</h4>
                    </div>
                    <div id='dashboardBox2'>
                        <small>Pending Orders</small>
                        <h4 style={{ fontSize: "1.5rem" }}>{
                            pendingOrders.length
                        }</h4>
                    </div>
                    <div id='dashboardBox3'>
                        <small>Total Orders</small>
                        <h4 style={{ fontSize: "1.5rem" }}>{orders.length}</h4>
                    </div>
                </div>
                <div style={{ margin: "1rem 0rem", backgroundColor: "#F5F7FA", padding: "1.25rem 0rem" }}>
                    <div style={{ fontSize: "18px", fontWeight: 500, marginBottom: "0.75rem", color: "#37474f" }}>Pending Orders</div>
                    {
                        pendingOrders.length === 0 ?
                            <div style={{ textAlign: "center", fontSize: "1.5rem", color: "#37474f", fontWeight: 500, padding: "1rem 0rem", backgroundColor: "#F5F7FA", borderRadius: "0.25rem", border: "1px solid rgba(0,0,0,0.065)", boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.075)" }}>No Pending Orders</div> :
                            <div style={{ overflow: "scroll", position: "relative" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", maxHeight: "500px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                                            <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", textAlign: "left", color: "#37477D" }}>Order ID</th>
                                            <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", textAlign: "left", color: "#37477D" }}>Customer</th>
                                            <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", textAlign: "left", color: "#37477D" }}>Date</th>
                                            <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", textAlign: "left", color: "#37477D" }}>Total</th>
                                            <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", textAlign: "left", color: "#37477D" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pendingOrders.map((order, index) => {
                                                return (
                                                    <tr style={{ backgroundColor: "#F5F7FA" }}>
                                                        <td style={{ padding: "0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)" }}>{order._id}</td>
                                                        <td style={{ padding: "0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)" }}>{order.buyerName}</td>
                                                        <td style={{ padding: "0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)" }}>{new Date(order.date).toLocaleDateString()}</td>
                                                        <td style={{ padding: "0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)" }}>${
                                                            order.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                                                            + Math.round(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18)
                                                            + (order.deliveryMethod === "Standard" ? 0 : 5)
                                                        }</td>
                                                        <td style={{ padding: "0.75rem", borderBottom: "1px solid rgba(0,0,0,0.065)", display: "flex", alignItems: "center" }}>
                                                            <button onClick={() => { setOrder(order) }} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#F5F7FA", border: "1px solid #868e96", borderRadius: "0.25rem", color: "#868e96" }}>View</button>
                                                            <button onClick={() => { dispatchOrder(order) }} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#F5F7FA", border: "1px solid #868e96", borderRadius: "0.25rem", color: "#868e96", marginLeft: "0.5rem" }}>Dispatch</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {
                order === undefined ? null :
                    <Order order={order} setOrder={setOrder} />
            }
        </div>
    )
}

export default Dashboard

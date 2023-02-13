import Order from "../components/Order";
import Sidebar from '../components/Sidebar';
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import React from 'react'
import axios from 'axios';

const Orders = () => {

  var { userInfo } = useSelector(state => state.signIn) || {};

  const [orders, setOrders] = React.useState([])
  const [order, setOrder] = React.useState(undefined)

  React.useEffect(() => {
    axios.get('/API/Orders',
      {
        headers: {
          'authorization': userInfo.token
        }
      }).then((response) => {
        setOrders(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {userInfo.name ?
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ background: "rgb(246, 247, 251)", width: "100%", padding: '30px 2vw', overflowX: "scroll" }}>
            <div style={{ fontSize: '20px', margin: '0 0 5px', letterSpacing: '.025em' }}>Orders</div>
            <div style={{ fontSize: '13px', display: "flex", marginBottom: "1rem" }}>
              <div style={{ color: "#37474f", marginRight: "12px" }}>Home</div>
              <div style={{ color: "#868e96", marginRight: "7px" }}>/</div>
              <div style={{ color: "#868e96" }}>Orders</div>
            </div>
            <div style={{ background: 'rgb(255, 255, 255)', padding: '32px', overflowX: "scroll" }}>
              <table style={{ width: '100%' }}>
                <thead style={{ background: 'rgb(246, 247, 251)' }}>
                  <tr>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Date</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Id</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Paid</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Delivery Status</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr style={{ cursor: "pointer" }} onClick={() => {
                        setOrder(order)
                      }} key={order._id}>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{
                          new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{order._id}</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{
                          order.paid === "Paid" ? <span style={{ color: "green" }}>Paid</span> : <span style={{ color: "red" }}>Not Paid</span>
                        }</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{
                          order.deliveryStatus === "Delivered" ? <span style={{ color: "green" }}>{order.deliveryStatus}</span> : order.deliveryStatus === "Cancelled" ? <span style={{ color: "red" }}>{order.deliveryStatus}</span> : <span style={{ color: "orange" }}>{order.deliveryStatus}</span>
                        }</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>${
                          order.orderItems.reduce((a, c) => a + c.price * c.quantity, 0) +
                          Math.round(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18) +
                          (order.deliveryMethod === "Standard" ? 0 : 5)
                        }</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {
            order === undefined ? null :
              <Order order={order} setOrder={setOrder} />
          }
        </div>
        :
        <ErrorPage />
      }
    </>
  )
}

export default Orders

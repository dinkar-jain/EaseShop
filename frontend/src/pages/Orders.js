import Sidebar from '../components/Sidebar';
import { useSelector } from "react-redux";
import Order from "../components/Order";
import ErrorPage from "./ErrorPage";
import axios from '../Axios';
import React from 'react'

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
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Mode of Payment</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Delivery Status</th>
                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{
                          new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{order._id}</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{order.paid === "Paid" ? "Paid via Online" : "Cash on Delivery"}</td>
                        <td style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', backgroundColor: order.deliveryStatus === "Delivered" ? '#d4edda' : order.deliveryStatus === "Cancelled" ? '#f8d7da' : '#fff3cd', color: order.deliveryStatus === "Delivered" ? '#155724' : order.deliveryStatus === "Cancelled" ? '#721c24' : '#856404', borderRadius: '0.25rem', fontWeight: 500 }}>
                            {order.deliveryStatus === "Not Delivered" ? "In Progress" : order.deliveryStatus}
                          </span>
                        </td>
                        <td style={{ padding: "0.75rem", display: "flex", alignItems: "center" }}>
                          <button onClick={() => { setOrder(order) }} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#F5F7FA", border: "1px solid #868e96", borderRadius: "0.25rem", color: "#868e96" }}>View</button>
                        </td>
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

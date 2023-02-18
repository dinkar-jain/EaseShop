import { updateProfileAction } from "../redux/actions/profileActions";
import { clearCartAction } from "../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import Payment from "../components/Payment";
import { toast } from 'react-toastify';
import "../css/Checkout.css"
import axios from "../Axios"
import React from 'react'

const Checkout = () => {

  const { userInfo } = useSelector(state => state.signIn) || {};

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");
  const { cart } = useSelector(state => state.cart);
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState([]);
  const [postalCode, setPostalCode] = React.useState("");
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [deliveryMethod, setDeliveryMethod] = React.useState("Standard");
  const [paymentMethod, setPaymentMethod] = React.useState("Cash On Delivery");

  const handleSubmit = async () => {
    try {
      if (email === "" || address === "" || firstName === "" || lastName === "" || postalCode === "" || country === "") {
        toast.error("Please fill in all the fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      else if (userInfo.address === "") {
        await dispatch(updateProfileAction(firstName + " " + lastName, address, country, postalCode))
      }

      const resp = await axios.post("/API/Orders/Create", {
        name: firstName + " " + lastName,
        email: email,
        address: address + ", " + country,
        postalCode: postalCode,
        deliveryMethod: deliveryMethod,
        paid: paymentMethod === "Cash On Delivery" ? false : true,
        sellerIds: Array.from(new Set(cart.map(item => item.sellerId))),
        deliveryStatus: "Not Dispatched",
        orderItems: cart
      }, {
        headers: {
          'authorization': userInfo.token
        }
      });
      if (resp.data.message) {
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/orders";
          dispatch(clearCartAction());
        }, 1000);
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  }

  React.useEffect(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("accordionActive");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    acc[0].classList.toggle("accordionActive");
    acc[1].classList.toggle("accordionActive");
    acc[2].classList.toggle("accordionActive");
    acc[0].nextElementSibling.style.maxHeight = acc[0].nextElementSibling.scrollHeight + "px";
    acc[1].nextElementSibling.style.maxHeight = acc[0].nextElementSibling.scrollHeight + "px";
    acc[2].nextElementSibling.style.maxHeight = acc[0].nextElementSibling.scrollHeight + "px";

    if (userInfo) {
      setFirstName(userInfo.name.split(" ")[0]);
      setLastName(userInfo.name.split(" ")[1]);
      setEmail(userInfo.email);
      setAddress(userInfo.address);
      setPostalCode(userInfo.postalCode);
      setCountry(userInfo.country);
    }

  }, [])

  return (
    <>
      <div className="checkout" style={{ display: "flex", backgroundColor: "#f9fafc" }}>
        <div className="checkout__left">
          <button class="accordion">
            <div style={{ width: "23px", height: "23px", border: "1px solid orange", borderRadius: "50%", color: "orange", textAlign: "center", marginRight: "10px" }}>1</div>
            <b>Shipping Details</b>
          </button>
          <div class="panel">
            <form style={{ margin: "5px 0px 15px 0px" }}>
              <div className="form__group" style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="name">First Name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "95%" }} type="text" name="name" id="name" />
                </div>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="name">Last Name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="name" id="name" />
                </div>
              </div>
              <div className="form__group">
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="email">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                </div>
              </div>
              <div className="form__group">
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="address">Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" />
                </div>
              </div>
              <div className="form__group" style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="zip">Zip</label>
                  <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ width: "95%" }} type="text" name="zip" id="zip" />
                </div>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <label htmlFor="country">Country</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" name="country" id="country" />
                </div>
              </div>
            </form>
          </div>

          <button class="accordion">
            <div style={{ width: "23px", height: "23px", border: "1px solid orange", borderRadius: "50%", color: "orange", textAlign: "center", marginRight: "10px" }}>2</div>
            <b>Delivery Method</b>
          </button>
          <div class="panel">
            <div style={{ display: "flex", padding: "10px 0px" }}>
              <div className="deliveryMethod" onClick={() => setDeliveryMethod("Standard")} style={{ flex: 1, padding: "15px", border: deliveryMethod === "Standard" ? "1px solid #8184e8" : "1px solid #e0e2e5", borderRadius: "10px", width: "100%", marginRight: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ color: "#3c414d", fontWeight: 500 }}>Standard</div>
                  {
                    deliveryMethod === "Standard" ?
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#8184e8", marginLeft: "auto" }} width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      : null
                  }
                </div>
                <div style={{ marginBottom: "25px", color: "#898c92" }}>4-10 business days</div>
                <div style={{ color: "#242936", fontWeight: 500 }}>$0.00</div>
              </div>
              <div className="deliveryMethod" onClick={() => setDeliveryMethod("Express")} style={{ flex: 1, padding: "15px", border: deliveryMethod === "Express" ? "1px solid #8184e8" : "1px solid #e0e2e5", borderRadius: "10px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginBottom: "3px", color: "#3c414d", fontWeight: 500 }}>Express</div>
                  {
                    deliveryMethod === "Express" ?
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#8184e8", marginLeft: "auto" }} width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      : null
                  }
                </div>
                <div style={{ marginBottom: "25px", color: "#898c92" }}>2-5 business days</div>
                <div style={{ color: "#242936", fontWeight: 500 }}>$5.00</div>
              </div>
            </div>
          </div>

          <button class="accordion">
            <div style={{ width: "23px", height: "23px", border: "1px solid orange", borderRadius: "50%", color: "orange", textAlign: "center", marginRight: "10px" }}>3</div>
            <b>Payment</b>
          </button>
          <div class="panel">
            <div style={{ display: "flex", padding: "10px 0px" }}>
              <input onClick={() => setPaymentMethod("Cash On Delivery")} defaultChecked type="radio" name="payment" id="payment" style={{ marginRight: "10px" }} />
              <div>
                <div style={{ margin: "0px", color: "#414952", fontWeight: 400 }}>Cash on Delivery</div>
                <p style={{ margin: "0px", color: "#838791" }}>Pay with cash upon delivery.</p>
              </div>
            </div>
            <div style={{ display: "flex", padding: "10px 0px" }}>
              <input onClick={() => setPaymentMethod("Online Banking")} type="radio" name="payment" id="payment" style={{ marginRight: "10px" }} />
              <div>
                <div style={{ margin: "0px", color: "#414952", fontWeight: 400 }}>Online Banking</div>
                <p style={{ margin: "0px", color: "#838791" }}>Pay now with your credit card or debit card.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout__right">
          <div style={{ backgroundColor: "white", border: "1px solid #e6e8ea", borderRadius: "10px", padding: "10px" }}>
            <div style={{ color: "#242a34", fontWeight: 500, fontSize: "18px" }}>Order Summary</div>
            {
              cart.map((item, index) => {
                return (
                  <>
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
                      <div style={{ display: "flex", marginRight: "1rem" }}>
                        <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                        <div>
                          <div style={{ margin: "0px", color: "#414952", fontWeight: 400 }}>{item.name}</div>
                          <p style={{ margin: "0px", color: "#838791" }}>Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div>
                        <p style={{ margin: "0px", color: "#282d38", fontWeight: 600 }}>${item.price}</p>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#e6e8ea" }}></div>
                  </>
                )
              })
            }
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
              <div>
                <p style={{ margin: "0px", color: "#676b72" }}>Subtotal</p>
              </div>
              <div>
                <p style={{ margin: "0px", color: "#151c29", fontWeight: 500 }}>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
              <div>
                <p style={{ margin: "0px", color: "#676b72" }}>Shipping</p>
              </div>
              <div>
                <p style={{ margin: "0px", color: "#151c29", fontWeight: 500 }}>
                  {deliveryMethod === "Standard" ? "$0" : "$5"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
              <div>
                <p style={{ margin: "0px", color: "#676b72" }}>Taxes</p>
              </div>
              <div>
                <p style={{ margin: "0px", color: "#151c29", fontWeight: 500 }}>
                  ${Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18)}
                </p>
              </div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "#e6e8ea" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
              <div>
                <p style={{ margin: "0px", color: "#676b72" }}>Total</p>
              </div>
              <div>
                <p style={{ margin: "0px", color: "#151c29", fontWeight: 500 }}>
                  ${
                    cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
                    + Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18)
                    + (deliveryMethod === "Standard" ? 0 : 5)
                  }
                </p>
              </div>
            </div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "#e6e8ea" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0px" }}>
              <button onClick={() => {
                if (paymentMethod === "Cash On Delivery") {
                  handleSubmit()
                }
                else {
                  if (email === "" || address === "" || firstName === "" || lastName === "" || postalCode === "" || country === "") {
                    toast.error("Please fill in all the fields", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    return;
                  }
                  setPaymentModal(true)
                }
              }} style={{ backgroundColor: "#5046e5", color: "white", width: "100%", border: "1px solid #e6e8ea", borderRadius: "5px", padding: "10px 20px", fontWeight: 500, cursor: "pointer" }}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
      {
        paymentModal ? <Payment
          amount={
            cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
            + Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.18)
            + (deliveryMethod === "Standard" ? 0 : 5)
          }
          setPaymentModal={setPaymentModal}
          handleSubmit={handleSubmit}
        />
          : null
      }
    </>
  )
}

export default Checkout

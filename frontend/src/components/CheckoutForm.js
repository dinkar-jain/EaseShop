import React from "react";
import { toast } from 'react-toastify';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `http://localhost:3000`,
            },
            redirect: "if_required",
        });

        if (paymentIntent) {
            toast.success("Payment Successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            props.handleSubmit();
        }
        else if (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        props.setPaymentModal(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                e.target.id !== "payment-form" &&
                e.target.id !== "payment-element" &&
                e.target.id !== "submit"
            ) {
                props.setPaymentModal(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, zIndex: 101, background: "#00000080", width: "100%", height: "100%", overflow: "auto" }}>
            <div id="payment-form" style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
                <form onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />
                    <button style={{
                        background: "#000", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px",
                        cursor: "pointer", fontSize: "16px", fontWeight: "bold", marginTop: "20px", width: "100%", display: "flex",
                        justifyContent: "center", alignItems: "center",
                    }} disabled={!stripe || !elements} id="submit">
                        Pay
                    </button>
                </form>
            </div>
        </div>
    );
}

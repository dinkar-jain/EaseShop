import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Axios from "../Axios";
import React from "react";

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        Axios.get("/config").then(async (r) => {
            const { publishableKey } = await r.data;
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        Axios.post("/create-payment-intent", {
            amount: props.amount,
        }).then(async (result) => {
            var { clientSecret } = await result.data;
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm setPaymentModal={props.setPaymentModal} handleSubmit={props.handleSubmit} />
                </Elements>
            )}
        </>
    );
}

export default Payment;

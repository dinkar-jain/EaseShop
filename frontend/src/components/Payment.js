import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import React from "react";
import Axios from "axios";

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("/config").then(async (r) => {
            const { publishableKey } = await r.json();
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
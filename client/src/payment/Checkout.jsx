import React from "react"
import { api } from "../lib/axios"

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}

const Checkout = () => {
    const [amount, setAmount] = React.useState("");

    const handlePayment = async () => {

        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const res = await loadRazorpayScript()
        if (!res) {
            alert("Failed to load Razorpay SDK");
            return;
        }

        try {
            const { data: order } = await axios.post('/payment/create-order', {
                amount: amount * 100, // paise
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "Test Company",
                description: "Test Transaction",
                handler: async (response) => {
                    try {
                        const { data: verifyData } = await axios.post('/payment/verify', response);
                        alert(verifyData.message);
                    } catch (err) {
                        alert(err.message);
                    }
                },

                prefill: {
                    name: "Divit Jain",
                    email: "divit26j@gmail.com",
                    contact: "7024376593",
                },

                theme: { color: "#3399cc" },
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            alert("Something went wrong while creating order");
            console.error(err);
        }
    }
    return (
        <div style={{ padding: "20px" }}>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: "8px", marginRight: "10px", width: "150px" }}
            />
            <button onClick={handlePayment} style={{ padding: "8px 16px" }}>
                Pay Now
            </button>
        </div>
    )
}

export default Checkout;
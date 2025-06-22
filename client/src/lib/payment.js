import { api } from "./axios"

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const handleRazorpayPayment = async ({ amount, name, email, contact }) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
        alert("Failed to load Razorpay SDK");
        return;
    }

    try {
        const { data: order } = await api.post('/payments/create-order', {
            amount: amount * 100, // paise
        });

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "Your Company Name",
            description: "Payment for services",
            handler: async (response) => {
                try {
                    const { data: verifyData } = await api.post('/payments/verify', response);
                    alert(verifyData.message);
                } catch (err) {
                    alert(err.message || "Verification failed");
                }
            },
            prefill: {
                name,
                email,
                contact,
            },
            theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (err) {
        alert("Something went wrong while creating the order");
        console.error(err);
    }
};

export default handleRazorpayPayment;
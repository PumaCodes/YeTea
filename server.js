const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd', customer_info } = req.body;
        
        // Validate amount
        if (!amount || amount < 50) { // Minimum $0.50
            return res.status(400).json({ error: 'Invalid payment amount' });
        }
        
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: currency,
            metadata: {
                customer_email: customer_info?.email || '',
                customer_name: customer_info?.name || '',
                order_notes: customer_info?.notes || '',
                shipping_address: JSON.stringify(customer_info?.address || {})
            }
        });
        
        res.json({
            clientSecret: paymentIntent.client_secret
        });
        
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🍃 YeTea server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;

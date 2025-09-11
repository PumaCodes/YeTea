# YeTea Payment Integration Setup

## Stripe Configuration

To complete the payment integration, you'll need to:

### 1. Get Stripe API Keys
1. Sign up for a Stripe account at https://stripe.com
2. Go to the Stripe Dashboard > Developers > API Keys
3. Copy your **Publishable Key** (starts with `pk_test_`) and **Secret Key** (starts with `sk_test_`)

### 2. Update the JavaScript
In `script.js`, replace line 510 with your actual Stripe publishable key:
```javascript
stripe = Stripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE');
```

### 3. Set Environment Variables
Create a `.env` file in your project root with:
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
PORT=3000
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server
```bash
npm start
```

## Features

- **Product Selection**: Choose from three premium teas with quantity controls
- **Real-time Cart**: Dynamic order summary with live total calculation
- **Secure Checkout**: Stripe Elements for secure card input
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Visual feedback during payment processing

## Testing

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## Production Deployment

1. Replace test keys with live keys from Stripe Dashboard
2. Set up webhook endpoints for payment confirmation
3. Add proper error handling and logging
4. Implement order fulfillment system
5. Add email notifications for successful orders

## Security Notes

- Never expose your secret key in client-side code
- Always validate payments on your server
- Use HTTPS in production
- Implement proper error handling
- Consider adding rate limiting for payment attempts

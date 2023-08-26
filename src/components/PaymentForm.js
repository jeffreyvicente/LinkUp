import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ showModal, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Simulate successful payment (replace with actual backend logic)
      alert('Payment successful!');
      closeModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Payment Details</h2>
        <p>Total Amount: $1.00</p>
        <CardElement />
        <button onClick={handlePayment}>Pay $1.00</button>
      </div>
    </div>
  );
};

export default PaymentForm;

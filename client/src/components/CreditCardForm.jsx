// CreditCardForm.js
import React from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;

const CreditCardForm = () => {
  const stripePromise = loadStripe(
    "pk_test_51P5XTDRrhi8oNNxnVJl9h9jvuayT7lrpkCz3nAsItIkhBmcvljvGwFKiJjzeOwx4jLnlfDqwZI9SUOo18FIr5Uk700xBANi0pS"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle credit card submission
    alert("Payment successful! You are now a premium user.");
    // Redirect to settings page or update user settings in the database
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Credit Card Information</h2>
      <Label htmlFor="cardNumber">Card Number</Label>
      <Input type="text" id="cardNumber" name="cardNumber" />

      <Label htmlFor="expirationDate">Expiration Date</Label>
      <Input type="text" id="expirationDate" name="expirationDate" />

      <Label htmlFor="cvv">CVV</Label>
      <Input type="text" id="cvv" name="cvv" />

      <Label htmlFor="cardholderName">Cardholder Name</Label>
      <Input type="text" id="cardholderName" name="cardholderName" />

      <Button type="submit">Pay</Button>
    </Form>
  );
};

export default CreditCardForm;

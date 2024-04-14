// Checkout.js

import React, { useState } from "react";
import styled from "styled-components";
import CreditCardForm from "../components/CreditCardForm";

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const BoughtItems = styled.div`
  flex: 1;
`;
const CheckoutHeading = styled.h2`
  color: ${({ theme }) => theme.text};
`;
const Checkout = ({ location }) => {
  const defaultItems = [];
  const { state } = location || {}; // Destructure state from location or provide an empty object

  // If state exists, destructure items from it, otherwise use defaultItems
  const { items } = state || {};

  // Use items or defaultItems based on the presence of state
  const [boughtItems, setBoughtItems] = useState(items || defaultItems);

  return (
    <CheckoutWrapper>
      <BoughtItems>
        <CheckoutHeading>Bought Items</CheckoutHeading>
        <ul>
          {boughtItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </BoughtItems>
      <CreditCardForm />
    </CheckoutWrapper>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import VideoImg from "../img/video.png";
import PremiumImg from "../img/premium.png";

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const BoughtItems = styled.div`
  flex: 1;
`;

const CheckoutHeading = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 12px 15px;
  text-align: left;
`;

const TableCell = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.bgLight};
  padding: 12px 15px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.bgLight};
  }
`;
const Button = styled.button`
  width: 30%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.success};
  padding: 10px;
  border-radius: 20px;
  font-size: 20px;
  margin-left: 35%;
`;

const Checkout = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const userId = params.get("userId");
      const videoId = params.get("videoId");

      if (userId) {
        // Fetch premium membership data
        try {
          // const response = await axios.get("/api/premium");
          setItems([{ name: "Premium Membership", price: 29.99 }]);
          setTotalPrice(29.99);
        } catch (error) {
          console.error("Error fetching premium membership data:", error);
        }
      } else if (videoId) {
        // Fetch video data
        try {
          const response = await axios.get(`videos/find/${videoId}`);
          const video = response.data;
          setItems([{ name: video.title, price: video.price / 100 }]);
          setTotalPrice(video.price / 100);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      }
    };

    fetchData();
  }, [location.search]);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51P5XTDRrhi8oNNxnVJl9h9jvuayT7lrpkCz3nAsItIkhBmcvljvGwFKiJjzeOwx4jLnlfDqwZI9SUOo18FIr5Uk700xBANi0pS"
      );

      const lineItems = items.map((item) => ({
        currency: "cad", // Change the currency code as needed
        name: item.name,
        unit_amount: item.price * 100, // Convert price to cents
        quantity: 1, // Assuming each item is purchased only once
      }));

      const response = await axios.post("/auth/create-checkout-session", {
        lineItems,
      });

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error redirecting to Checkout:", result.error.message);
      }
    } catch (error) {
      console.error("Error creating Checkout Session:", error);
    }
  };

  return (
    <CheckoutWrapper>
      <BoughtItems>
        <CheckoutHeading>C h e c k o u t</CheckoutHeading>
        <TableContainer>
          <thead>
            <tr>
              <TableHeader>Items</TableHeader>
              <TableHeader>Price</TableHeader>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableHeader>Total :</TableHeader>
              <TableHeader>{totalPrice}</TableHeader>
            </TableRow>
          </tbody>
        </TableContainer>
      </BoughtItems>
      <Button onClick={makePayment}>Proceed to Pay !</Button>
    </CheckoutWrapper>
  );
};

export default Checkout;

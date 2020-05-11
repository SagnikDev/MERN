import React, { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckouts = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let sum = 0;
    products.map((product, index) => {
      sum += product.price;
    });
    return sum;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //Call further Method
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey="pk_test_PLJp684PHp1QucdMH0CPeZtt00in5B92yr"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirt"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">SignIn</button>
      </Link>
    );
  };
  return (
    <div>
      <h1>Stripe Checkout Loaded {getFinalPrice()}</h1>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckouts;

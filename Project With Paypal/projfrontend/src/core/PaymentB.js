import React, { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";

const PatmentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const getToken = (userId, token) => {
    getmeToken(userId, token).then((response) => {
      console.log("TOKEN", response);

      if (response.error) {
        setInfo({ ...info, error: response.error });
      } else {
        const clientToken = response.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showDropIN = () => {
    return (
      <div>
        {info.clientToken !== null &&
        products.length > 0 &&
        isAuthenticated() ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success" onClick={onPurchase}>
              Proceed to Pay ${getAmont()}
            </button>
          </div>
        ) : (
          <div>
            <h3>
              <Link to="/signin">Login</Link> or Add Products in Cart!
            </h3>
          </div>
        )}
      </div>
    );
  };
  const getAmont = () => {
    let total = 0;
    products.map((product) => {
      total += product.price;
    });
    return total;
  };
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmont(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS", response);

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          console.log(orderData);
          createOrder(userId, token, orderData);

          cartEmpty(() => {
            console.log("Did we got a crash?");
          });
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT Failed");
        });
    });
  };
  return (
    <div>
      <h3>Add your Card detals Here!</h3>
      {showDropIN()}
      {JSON.stringify(products)}
    </div>
  );
};

export default PatmentB;

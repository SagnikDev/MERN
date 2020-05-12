//Index Page
import React, { useState, useEffect } from "react";
//Importing CSS file
import "../styles.css";
import { API } from "../backend";
// Importing Base format
import Base from "./Base.js";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
//Making Home Page
export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of TShirt</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key="index" className="col-3 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

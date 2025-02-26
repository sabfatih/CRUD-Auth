import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const dateFormat = (productCreatedAt) => {
    const date = new Date(productCreatedAt);
    return date.toLocaleString("en-US", {
      year: "numeric", // e.g. "2025"
      month: "long", // e.g. "February"
      day: "numeric", // e.g. "19"
      hour12: false, // for 12-hour clock
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of products</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created by</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>{product.user.name}</th>
                <th>{dateFormat(product.createdAt)}</th>
                <th>
                  <div className="buttons">
                    <button className="button is-small is-info">Edit</button>
                    <button className="button is-small is-danger">
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;

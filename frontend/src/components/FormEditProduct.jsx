import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FormEditProduct = () => {
  const [warning, setWarning] = useState("");
  const [required, setRequired] = useState([false, false]);

  return (
    <div className="">
      <div className="">
        <div className="card">
          <div className="card-content">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const price = e.target.price.value;
                if (!name || !price) {
                  if (!name) {
                    setRequired((prev) => [true, prev[1]]);
                  }
                  if (!price) {
                    setRequired((prev) => [prev[0], true]);
                  }
                  return false;
                }

                try {
                  const foundUser = await axios.patch(
                    `http://localhost:5000/products/${productId}`,
                    {
                      name,
                      price,
                    }
                  );
                  setWarning("");
                  console.log(foundUser);
                } catch (e) {
                  console.log(e);
                  setWarning(e.response.data.msg);
                }
              }}
            >
              <h1 className="title is-2">Edit product</h1>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className={`input ${
                      required[0] ? "is-danger is-outlined" : ""
                    }`}
                    placeholder="name"
                    name="name"
                    autoComplete="off"
                    onChange={() => setRequired((prev) => [false, prev[1]])}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className={`input ${
                      required[1] ? "is-danger is-outlined" : ""
                    }`}
                    placeholder="Price"
                    name="price"
                    autoComplete="off"
                    onChange={() => setRequired((prev) => [prev[0], false])}
                  />
                </div>
              </div>
              {warning.length > 0 ? (
                <p className="has-text-danger">{warning}</p>
              ) : (
                ""
              )}
              <div className="field">
                <button type="submit" className="button is-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;

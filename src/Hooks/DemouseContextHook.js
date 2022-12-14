import React, { useContext } from "react";
import { context } from "./Context/ContextProvider";
let arrProduct = [
  { id: 1, name: "Iphone", price: 1000 },
  { id: 2, name: "Samsung Galaxy Note 10 Plus", price: 2000 },
  { id: 3, name: "OPPO Find X9", price: 4000 },
];

export default function DemouseContextHook(props) {
  let { cartReducer } = useContext(context);
  let [cart, dispatch] = cartReducer;

  const addToCart = (item) => {
    const action = {
      type: "ADD_TO_CART",
      item,
    };
    dispatch(action);
  };

  const deleteToCart = (id) => {
    const action = {
      type: "DELETE_TO_CART",
      id,
    };

    dispatch(action);
  };

  const UpAndDownCart = (id, number) => {
    const action = {
      type: "UP_AND_DOWN",
      id,
      number,
    };
    dispatch(action);
  };

  return (
    <div className="container">
      <div className="row">
        {arrProduct.map((item, index) => (
          <div className="col-4" key={index}>
            <div className="card" style={{ width: "18rem", height: "28rem" }}>
              <img
                src="https://picsum.photos/200/"
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.price.toLocaleString()}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mt-3">
        <h3 className="text-success text-center">Shopping Cart</h3>
        <div className="table-responsive">
          <table className="table table-primary text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => {
                        UpAndDownCart(product.id, 1);
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                    {product.quantity}
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        UpAndDownCart(product.id, -1);
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>{(product.quantity * product.price).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteToCart(product.id);
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

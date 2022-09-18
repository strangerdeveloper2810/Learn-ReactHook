import React, { useReducer } from "react";

const initialCart = [
  // { id: 1, name: "Iphone", price: 1000, quantity: 1 }
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let cartUpdate = [...state];
      let index = cartUpdate.findIndex(
        (itemCart) => itemCart.id === action.item.id
      );
      //   Sản phẩm đã tồn tại trong giỏ hàng
      if (index !== -1) {
        cartUpdate[index].quantity += 1;
      } else {
        const itemCart = { ...action.item, quantity: 1 };
        cartUpdate.push(itemCart);
      }
      return cartUpdate;
    }

    case "DELETE_TO_CART": {
      let cartUpdate = [...state];
      let result = cartUpdate.filter(
        (itemCart) => itemCart.id !== action.itemId
      );
      console.log(result);
      return result;
    }
    default:
      return [...state];
  }
};
export default function DemouseReducerHook(props) {
  let [cart, dispatch] = useReducer(cartReducer, initialCart);

  let arrProduct = [
    { id: 1, name: "Iphone", price: 1000 },
    { id: 2, name: "Note 10 Plus", price: 2000 },
    { id: 3, name: "Huawei P20", price: 1200 },
  ];

  const addToCart = (item) => {
    const action = {
      type: "ADD_TO_CART",
      item,
    };
    dispatch(action);
  };

  const deleteCart = (itemId) => {
    const action = {
      type: "DELETE_TO_CART",
      itemId,
    };
    dispatch(action);
  };

  return (
    <div className="container">
      <div className="row">
        {arrProduct.map((item, index) => (
          <div className="col-4" key={index}>
            <div className="card" style={{ width: "350px", height: "600px" }}>
              <img
                className="card-img-top"
                src="https://picsum.photos/200/"
                width={350}
                height={500}
                alt={index}
              />
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <p className="card-text">{item.price}</p>
                <button
                  className="btn btn-info"
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
      <h3 className="text-center text-success">Giỏ Hàng</h3>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Id</th>
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
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.quantity * product.price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteCart(product.id);
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
  );
}

import React, { useReducer } from "react";

export const context = React.createContext();
const initialCart = [
  //   { id: 1, name: "Iphone", price: 1000, quantity: 1 }
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let cartUpdate = [...state];
      const index = cartUpdate.findIndex(
        (itemCart) => itemCart.id === action.item.id
      );
      if (index !== -1) {
        cartUpdate[index].quantity += 1;
      } else {
        const itemCart = { ...action.item, quantity: 1 };
        cartUpdate.push(itemCart);
      }
      return cartUpdate;
    }

    case "DELETE_TO_CART": {
        console.log(action);
      let cartUpdate = [...state];
      let result = cartUpdate.filter((itemCart) => itemCart.id !== action.id);
      return result;
    }

    default:
      return state;
  }
};
export default function ContextProvider(props) {
  let [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Store giống như rootReducer

  const store = {
    cartReducer: [cart, dispatch],
  };
  return <context.Provider value={store}>{props.children}</context.Provider>;
}

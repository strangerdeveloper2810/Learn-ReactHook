import React, { memo } from "react";

function ChilduseMemoHook(props) {
    const {cart} = props;
    console.log(cart);
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-primary text-center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index)=>(
                <tr key={index}>
                    <th>{item.id}</th>
                    <th>{item.name}</th>
                    <th>{item.price}</th>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default memo(ChilduseMemoHook);
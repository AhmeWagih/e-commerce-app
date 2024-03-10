import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../ReduxToolKit/Clices/cart-clice";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Counter from "./Counter";
import { Fragment } from "react";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts);

  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            className="btn btn-outline-danger btn-close float-end"
            aria-label="Close"
            onClick={() => dispatch(removeFromCart(cartItem))}
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">
                ${cartItem.price}
              </p>
              <p className=" fw-bold">Quantity : {cartItem.quantity}</p>
              <Counter cartItem={cartItem} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };
  const button = () => {
    return (
      <div className="container d-flex justify-content-center">
        <div className="row">
          <Link to="/checkout" className="btn btn-outline-primary mb-5">
            Proceed To checkout
          </Link>
        </div>
        <div className="row ms-5">
          <Button className="btn mb-5" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      {cart.length === 0 && emptyCart()}
      {cart.length !== 0 && cart.map(cartItems)}
      {cart.length !== 0 && (
        <div className="container">
          <h4 className="float-end bg-light p-2">
            Total Price : {totalPrice.toFixed(2)}$
          </h4>
        </div>
      )}
      {cart.length !== 0 && button()}
    </Fragment>
  );
}

export default Cart;

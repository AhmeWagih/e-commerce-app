import { useDispatch } from "react-redux";
import { increment, decrement } from "../ReduxToolKit/Clices/counter-slice";
import { updateQuantity } from "../ReduxToolKit/Clices/cart-clice";
const Counter = ({ cartItem }) => {
  const dispatch = useDispatch();
  const incrementHandler = () => {
    if (cartItem.quantity < 5) {
      dispatch(increment());
      dispatch(
        updateQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 })
      );
    }
  };
  const decrementHandler = () => {
    if (cartItem.quantity > 0) {
      dispatch(decrement());
      dispatch(
        updateQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 })
      );
    }
  };
  return (
    <div>
      <div>
        <div>
          <button
            className="me-2 btn btn-primary"
            aria-label="Increment value"
            onClick={incrementHandler}
            disabled={cartItem.quantity >= 5}
          >
            +
          </button>
          <button
            className="ms-2 btn btn-primary"
            aria-label="Decrement value"
            onClick={decrementHandler}
            disabled={cartItem.quantity === 1}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;

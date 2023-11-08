import React, { useContext, useState } from "react";

import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});                      //cartCtx.addItem({...item, amount: 1});
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };


  function orderHandler() {
    setIsCheckout(true);
  }

  const submitOrderHandler = (userData) => {
    setSubmitting(true);
    fetch("https://food-delivery-app-be440-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItem = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}              //.bind(null, item)
          onRemove={cartItemRemoveHandler.bind(null, item.id)}        //.bind(null, item.id)
        />
      ))}
    </ul>
  );

  const cartContent = <React.Fragment>
    {cartItem}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Place Order</button>}
      </div>}
  </React.Fragment>

  const submittingContent = <p>Placing your order...</p>;

  const submittedContent = <React.Fragment>
    <p>Order Placed...</p>
    <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
    </div>
    </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!submitting && !submitted && cartContent}
      {submitting && submittingContent}
      {!submitting && submitted && submittedContent}
    </Modal>
  );
};

export default Cart;

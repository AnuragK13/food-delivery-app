import { useRef, useState }  from 'react';

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isCorrect = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [inputsAreValid, setInputsAreValid] = useState({
        name: true,
        street: true,
        post: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const cityIsValid = !isEmpty(enteredCity);
        const postIsValid = isCorrect(enteredPostalCode);

        setInputsAreValid({
            name: nameIsValid,
            street: streetIsValid,
            post: postIsValid,
            city: cityIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            post: enteredPostalCode,
            city: enteredCity
        });
    }



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${inputsAreValid.name ? "" : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputsAreValid.name && <p>Please Enter A Valid Name.</p>}
      </div>
      <div className={`${classes.control} ${inputsAreValid.street ? "" : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputsAreValid.street && <p>Please Enter A Valid Street.</p>}
      </div>
      <div className={`${classes.control} ${inputsAreValid.post ? "" : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!inputsAreValid.post && <p>Please Enter A Valid Postal Code.</p>}
      </div>
      <div className={`${classes.control} ${inputsAreValid.city ? "" : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputsAreValid.city && <p>Please Enter A Valid City.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

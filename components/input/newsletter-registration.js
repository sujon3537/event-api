import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const inputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    const enteredEmail = inputRef.current.value;
    // optional: validate input
    if (!enteredEmail || !enteredEmail.includes("@")) {
      return console.log("please enter an valid email to signup to newsletter");
    }
    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

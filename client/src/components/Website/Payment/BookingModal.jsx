import React from "react";
import ReactDOM from "react-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51OF0wGLz8T2xmaTmlGyyYlzySbUQ8dh3nJbAQGxBYgRlfYResBCMAb7siQdaJ9jWO2OmXXrHFEaQ5uZW6at3zWP100OuLbiZEu";
const clientSecret =
  "sk_test_51OF0wGLz8T2xmaTmWCAba6QFU2beCyjnk9NJoy8sVRcmEy8XdQcSiOArBOredFlXHAay9162zzHSa9BMvO3EK2gs00KuCAJ0yH";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const BookingModal = ({ children, onClose }) => {
  const portalRoot = document.getElementById("booking");

  return ReactDOM.createPortal(
    <div className="fixed z-[55] top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 bg-opacity-50">
      <div className="bg-second-color p-6 pt-5 rounded shadow-lg w-full md:w-2/3 lg:w-3/5 text-black flex flex-col gap-3 justify-center">
        {children}
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </Elements>
        )}
        <button
          onClick={onClose}
          className="mx-5 py-2 px-4 bg-white hover:bg-second-color border text-fourth-color border-fourth-color md:text-lg rounded shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>,
    portalRoot
  );
};

export default BookingModal;

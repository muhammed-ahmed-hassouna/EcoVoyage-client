import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  // hidePostalCode: false,
  style: {
    base: {
      iconColor: "#115e59",
      color: "#115e59",
      fontSize: "20px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#0f766e"
      },
    },
    invalid: {
      color: "#be123c",
      ":focus": {
        color: "#be123c"
      }
    }
  }
};

function CardSection() {
    return <CardElement options={CARD_ELEMENT_OPTIONS} />;
  }
  export default CardSection;
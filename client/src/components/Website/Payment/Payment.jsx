import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { useBooking } from "../../Context/BookingContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51OF0wGLz8T2xmaTmlGyyYlzySbUQ8dh3nJbAQGxBYgRlfYResBCMAb7siQdaJ9jWO2OmXXrHFEaQ5uZW6at3zWP100OuLbiZEu";
const clientSecret =
  "sk_test_51OF0wGLz8T2xmaTmWCAba6QFU2beCyjnk9NJoy8sVRcmEy8XdQcSiOArBOredFlXHAay9162zzHSa9BMvO3EK2gs00KuCAJ0yH";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const { bookData, onBooking } = useBooking();
  const [luggage, setLuggage] = useState("1 X 20KG");
  const [error, setError] = useState("");

  useEffect(() => {
    onBooking({
      ...bookData,
      bag_details: luggage,
    });
  }, [1]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    onBooking({
      ...bookData,
      [name]: value,
    });
    if (value == "") {
      setError("Please fill all fields");
    }else{
      setError("");
    }
  };
  
  return (
    <div className="flex flex-wrap justify-center items-center mx-5 my-5">
      <div className="rounded w-full md:w-3/5 border border-Base-color bg-transparent-first-color">
        <div className="flex justify-center items-start md:items-center">
          <div className="py-8 px-5 md:px-12 w-full">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl text-Base-color font-bold text-start mb-4 cursor-pointer">
                Trip Details
              </h1>
            </div>
            <div className="space-y-4 flex flex-col justify-center items-center">
              <div
                class="p-4 mb-4 self-start text-sm text-center text-fourth-color rounded bg-light-pink/20 border border-fourth-color font-bold"
                role="alert"
              >
                <span class="font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-fourth-color inline-block"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>{" "}
                Please make sure that your name and date of brth match the
                passport/ID card.
              </div>

              {/* name */}
              <label className="px-3 self-start">Name</label>
              <div className="flex w-full gap-5">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={bookData && bookData.first_name}
                  onChange={(e) => handleChange(e)}
                  className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={bookData && bookData.last_name}
                  onChange={(e) => handleChange(e)}
                  className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none"
                />
              </div>

              {/* DOB */}
              <label className="px-3 self-start">Date of birth</label>
              <input
                type="date"
                name="dateof_birth"
                placeholder="date"
                value={bookData && bookData.dateof_birth}
                onChange={(e) => handleChange(e)}
                className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none"
              />

              {/* Phone */}
              <label className="px-3 self-start">Phone</label>
              <input
                type="number"
                name="phone_number"
                placeholder="Phone"
                value={bookData && bookData.phone}
                onChange={(e) => handleChange(e)}
                className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none"
              />
            </div>

            <div className="flex flex-wrap justify-center my-5 items-center gap-2 md:gap-5">
              <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded shadow sm:p-8">
                <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                  <img
                    className="w-12 md:w-24"
                    src="https://cdn-icons-png.flaticon.com/512/5477/5477268.png"
                    alt="Suitcase icon"
                  />
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      id="luggage-option-1"
                      type="radio"
                      name="luggage"
                      value="20kg"
                      onChange={() => {
                        onBooking({
                          ...bookData,
                          bag_details: "1 X 20KG",
                        });
                        setLuggage("1 X 20KG");
                      }}
                      className="relative h-5 w-5 rounded-full border-2 border-solid border-third-color checked:border-third-color hover:cursor-pointer  focus:shadow-none focus:outline-none focus:ring-0  checked:focus:border-third-color text-third-color"
                      aria-labelledby="country-option-1"
                      aria-describedby="country-option-1"
                      checked
                    />
                    <label
                      class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                      for="inlineRadio1"
                    >
                      1 X 20KG (<span className="text-green-500">Included</span>
                      )
                    </label>
                  </div>
                </div>
                <div class="space-y-5 my-7"></div>
              </div>
              <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                  <img
                    className="w-12 md:w-24"
                    src="https://cdn-icons-png.flaticon.com/512/5477/5477268.png"
                    alt="Suitcase icon"
                  />
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      id="luggage-option-2"
                      type="radio"
                      name="luggage"
                      value="25kg"
                      onChange={() => {
                        onBooking({
                          ...bookData,
                          bag_details: "1 X 25KG",
                        });
                        setLuggage("1 X 25KG");
                      }}
                      className="relative h-5 w-5 rounded-full border-2 border-solid border-third-color checked:border-third-color hover:cursor-pointer  focus:shadow-none focus:outline-none focus:ring-0  checked:focus:border-third-color text-third-color"
                      aria-labelledby="country-option-2"
                      aria-describedby="country-option-2"
                    />
                    <label
                      class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                      for="inlineRadio1"
                    >
                      1 X 25KG (40 JOD)
                    </label>
                  </div>
                </div>
                <div class="space-y-5 my-7"></div>
              </div>
              <div class="w-32 h-44 md:w-52 md:h-60 p-4 bg-white border border-gray-200 rounded shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col justify-center items-center w-full h-full gap-6 text-gray-900 dark:text-white">
                  <img
                    className="w-12 md:w-24"
                    src="https://cdn-icons-png.flaticon.com/512/5477/5477268.png"
                    alt="Suitcase icon"
                  />
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      id="luggage-option-3"
                      type="radio"
                      name="luggage"
                      value="30kg"
                      onChange={() => {
                        onBooking({
                          ...bookData,
                          bag_details: "1 X 30KG",
                        });
                        setLuggage("1 X 30KG");
                      }}
                      className="relative h-5 w-5 rounded-full border-2 border-solid border-third-color checked:border-third-color hover:cursor-pointer  focus:shadow-none focus:outline-none focus:ring-0  checked:focus:border-third-color text-third-color"
                      aria-labelledby="country-option-3"
                      aria-describedby="country-option-3"
                    />
                    <label
                      class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-[12px] md:text-lg"
                      for="inlineRadio1"
                    >
                      1 X 30KG (80 JOD)
                    </label>
                  </div>
                </div>
                <div class="space-y-5 my-7"></div>
              </div>
            </div>
            <div>
              <h1 className="px-5 text-start w-full py-2">Payment</h1>
              <p className="text-start text-red-500 px-10">{error}</p>
              {clientSecret && stripePromise && (
                <Elements stripe={stripePromise}>
                  <ElementsConsumer>
                    {({ stripe, elements }) => (
                      <CheckoutForm
                        stripe={stripe}
                        elements={elements}
                        emptyField={error}
                      />
                    )}
                  </ElementsConsumer>
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

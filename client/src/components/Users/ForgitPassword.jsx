import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setResetPasswordEmail } = useAuth();
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:3999/sendEmail", {
          email,
        })
        .then(() => {
          setError("");
          navigate("/verify-code");
        });
    } catch (error) {
      setError("Invalid Emai, Please enter a valid email");
    }
  };
  return (
    <div class="w-full h-screen bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      <div class="flex flex-col items-center justify-center w-full h-full  p-4 space-y-4 antialiased text-Base-color ">
        <div class="w-full px-8 max-w-lg space-y-6 bg-second-color rounded py-16">
          <h1 class=" mb-6 text-2xl sm:text-3xl font-bold text-center">Forgot Password?</h1>
          <p class="text-center mx-12 text-third-color">
            Enter your email address
          </p>
          <form onSubmit={handleEmailSubmit} class="space-y-6 w-ful">
            <input
              class="w-full px-4 py-2 border border-transparent-third-color rounded focus:outline-none focus:border-transparent-third-color focus:ring focus:ring-transparent-first-color"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setResetPasswordEmail(e.target.value);
              }}
              placeholder="Email address"
              required
            />
            <p className="text-start text-sm sm:text-md text-red-500">{error!==""&&error}</p>
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 font-medium text-center text-second-color bg-fourth-color rounded hover:bg-second-color hover:text-fourth-color border border-fourth-color"
              >
                Send
              </button>
            </div>
          </form>
          <div class="text-sm text-gray-600 items-center flex justify-start">
            <Link to="/login">
              <p class="text-Base-color cursor-pointer hover:text-fourth-color inline-flex items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Back
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

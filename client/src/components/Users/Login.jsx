import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assests/Images/logo.png";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
// import { GoogleLogin } from "@react-oauth/google";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");
  const { isAdmin, onLogin } = useAuth();
  const [userGoogle, setUserGoogle] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3999/Login", {
        email: formData.email,
        password: formData.password,
      });

      // Assuming the API returns a token
      const token = response.data.token;

      // set cookies
      if (response.data.role_id === 2) {
        onLogin(true, token);
        history("/dashboard");
      } else {
        onLogin(false, token);
        history(-1);
      }
      setError("Sign-in successful");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have Signed in successfully.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
        },
      });

      // Handle successful sign-in, e.g., redirect or show a success message
      // alert("Sign-in successful:", response.data);
    } catch (error) {
      // Delay the error message and handle it
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign-in failed. Email or password is invalid.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
        },
      });
      setError("Sign-in failed. Email or password is invalid");
    }
  };

  useEffect(() => {
    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          try {
            const response = await axios.post(
              "http://localhost:3999/google",
              res.data
            );
            const token = response.data.token;

            // Make sure the token is not undefined or null before storing it
            if (token) {
              login(token);
              navigate("/");
            }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  }, [userGoogle, navigate]);

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      <form
        className="scale-75 sm:scale-100"
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="min-h-screen flex justify-center items-center">
          <div className="py-8 px-12 bg-second-color rounded-2xl shadow-xl z-20">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-5 mb-5">
                <img className=" w-16" src={logo} alt="EcoVoyage logo" />
                <h1 className="text-5xl font-bold text-fourth-color font-grape-nuts">
                  EcoVoyage
                </h1>
              </div>
              <h1 className="text-3xl text-Base-color font-bold text-center mb-4 cursor-pointer">
                Log In
              </h1>
              <p className="w-80 text-center text-sm mb-8 font-semibold text-third-color tracking-wide cursor-pointer">
                Unlock New Adventures with Your Travel Account
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Addres"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-transparent-third-color outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-transparent-third-color outline-none"
              />
              <Link to={"/forgot-password"}>
                <p className="mt-4 text-sm text-third-color cursor-pointer text-start">
                  {" "}
                  Forgot your password?
                </p>
              </Link>
            </div>
            <p className="text-sm text-start text-red-500">{error}</p>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-second-color hover:text-fourth-color bg-fourth-color border-2 hover:bg-second-color border-fourth-color rounded-2xl"
              >
                Log In
              </button>
              <p className="mt-4 text-sm text-Base-color">
                Or login with: <br />
                <br />
                <div class="mx-10 px-6 sm:px-0 max-w-sm">
                  <button
                    type="button"
                    onClick={() => loginbygoogle()}
                    class="text-third-color w-full border border-third-color/20 bg-third-color/20 hover:bg-second-color font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-around mr-2 mb-2"
                  >
                    <svg
                      class="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Sign up with Google<div></div>
                  </button>
                </div>
              </p>
              <p className="mt-4 text-sm text-Base-color">
                Don't Have An Account?{" "}
                <Link to={"/signup"}>
                  <span className="underline cursor-pointer text-fourth-color">
                    {" "}
                    Sign Up
                  </span>
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500">
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Go back
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

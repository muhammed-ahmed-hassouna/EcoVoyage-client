import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { resetPasswordEmail } = useAuth();
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        const response = await axios
          .put(
            "http://localhost:3999/updatepassword",
            {
              newPassword: newPassword,
              confirm_password: confirmPassword,
            //   email: resetPasswordEmail,
            }
          )
          .then(() => {
            setErrorMessage("");
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Password has been reset.",
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
              },
            });
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Faild to reset password.",
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
              },
            });
          });
      } else {
        setErrorMessage("Passwords do not match.");
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section class="bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover bg-center">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 scale-75 sm:scale-100">
        <div class="bg-second-color px-6 py-10 shadow-xl mx-auto w-full max-w-lg rounded">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-Base-color md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handlePasswordReset}
          >
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-start text-Base-color"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-white border border-transparent-third-color text-Base-color sm:text-sm rounded focus:ring-transparent-first-color focus:border-transparent-third-color block w-full p-2.5"
                required
                value={newPassword.password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-start text-Base-color"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-white border border-transparent-third-color text-Base-color sm:text-sm rounded focus:ring-transparent-first-color focus:border-transparent-third-color block w-full p-2.5"
                required
                value={confirmPassword.password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              class="w-full text-second-color bg-fourth-color hover:bg-second-color hover:text-fourth-color border border-fourth-color focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;

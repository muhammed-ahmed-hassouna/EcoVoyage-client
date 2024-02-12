import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      if (name === "first_name") {
        setFirstName(value);
      } else {
        setlastName(value);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    let contactData = {
      fullname: `${firstName} ${lastName}`,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      const response = await axios.post(
        `http://localhost:3999/sendEmailContact`,
        contactData
      );
      setFormData({
        email: "",
        subject: "",
        message: "",
      });
      setFirstName("");
      setlastName("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your message has been successfully sent.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
        },
      });
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* side image */}
      <div className="mb-4 md:mb-0 md:w-4/5">
        <img
          className="brightness-150 w-full object-cover md:object-contain h-96 md:h-screen"
          src="https://images.unsplash.com/photo-1507812984078-917a274065be?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
        />
      </div>

      {/* contact form */}
      <div className="container md:flex md:flex-col md:justify-center">
        <form action="" onSubmit={handleSubmit}>
          <div className="min-h-screen flex justify-center items-start md:items-center">
            <div className="py-12 px-12 w-full">
              {/* header */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl text-Base-color font-bold text-center mb-4 cursor-pointer">
                  Reach Us
                </h1>
                <p className="w-80 self-center text-center text-sm mb-8 font-semibold text-third-color tracking-wide cursor-pointer">
                  We'd love to hear from you!
                </p>
              </div>

              {/* form inputs */}
              <div className="space-y-4">
                {/* name */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleChange}
                    required
                    className="block text-sm py-3 px-4 rounded w-full border border-[#0c4a6e69] outline-none"
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleChange}
                    required
                    className="block text-sm py-3 px-4 rounded w-full border border-[#0c4a6e69] outline-none"
                  />
                </div>
                {/* email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded w-full border border-[#0c4a6e69] outline-none"
                />
                {/* subject */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  required
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded w-full border border-[#0c4a6e69] outline-none"
                />
                {/* message */}
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm rounded border border-[#0c4a6e69] outline-none"
                  value={formData.message}
                  placeholder="Write your message..."
                  required
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* submit button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="py-3 w-64 text-xl text-second-color hover:text-fourth-color bg-fourth-color border-2 hover:bg-second-color border-fourth-color rounded"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

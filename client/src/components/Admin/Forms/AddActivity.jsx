import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";

const AddActivity = () => {
  const [formData, setFormData] = useState([]);
  const { onSelectedPage } = usePage();
  const { headers } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    if (formData.files) {
      formData.files.forEach((file, index) => {
        formDataToSend.append(`files[]`, file);
      });
    }

    // Append other form data fields if needed
    formDataToSend.append("title", formData.title);
    formDataToSend.append("activity_details", formData.activity_details);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("pricing", formData.pricing);
    formDataToSend.append("location", formData.location);
    axios
      .post(`http://localhost:3999/addActivities`, formDataToSend, {
        headers: headers,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Item has been updated.",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
          },
        });
        setFormData([]);
        onSelectedPage("dashboard");
        setFormData([]);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
          },
        });
      });
  };
  const handleClose = (e) => {
    e.preventDefault();
    setFormData([]);
    onSelectedPage("dashboard");
  };
  return (
    <div>
      <div className="flex flex-col justify-center top-64 items-center lg:ml-28 h-full w-auto">
        <div className="lg:w-2/3 w-full bg-transparent-first-color p-6 rounded shadow-lg h-auto m-6">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="p-6 w-full">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl text-Base-color font-bold text-center mb-4 cursor-pointer">
                  Add Activity
                </h1>
              </div>
              <div className="space-y-4">
                <div className="text-start">
                  <label
                    class="block mb-2 text-sm font-medium text-Base-color"
                    for="multiple_files"
                  >
                    Upload Image
                  </label>
                  <input
                    class="block w-full text-md file:bg-fourth-color bg-second-color file:hover:bg-light-pink/20 border border-transparent-third-color file:text-second-color file:hover:text-fourth-color  text-Base-color rounded cursor-pointer focus:outline-none file:py-2 file:px-4 file:border-0"
                    name="image"
                    onChange={(e) => handleChange(e)}
                    type="file"
                    multiple
                  />
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Place Name"
                    onChange={(e) => handleChange(e)}
                    required
                    className="block text-sm py-3 px-4 my-2 bg-second-color rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Overview
                  </label>
                  <textarea
                    name="activity_details"
                    rows="4"
                    value={formData.activity_details}
                    class="block p-2.5 w-full my-2 text-sm rounded bg-second-color border border-transparent-third-color outline-none"
                    placeholder="Enter a description or an overview about the place..."
                    required
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Place type"
                    value={formData.type}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 bg-second-color rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    placeholder="Enter the country the place in"
                    value={formData.availability}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 bg-second-color rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter the country the place in"
                    value={formData.location}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 bg-second-color rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="pricing"
                    placeholder="Enter the country the place in"
                    value={formData.pricing}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 bg-second-color rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="mt-4 m-2 py-2 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-fourth-color"
                >
                  Add
                </button>
                <button
                  type="clear"
                  onClick={(e) => handleClose(e)}
                  className="mt-4 m-2 py-2 px-5 border-2 border-fourth-color text-fourth-color rounded hover:bg-second-color"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { Dropdown } from "flowbite-react";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";

const AddDestination = () => {
  const [formData, setFormData] = useState([]);
  const { onSelectedPage, page } = usePage();
  const [selected, setSelected] = useState("Select Type");
  const { headers } = useAuth();

  const dropdownStyles = {
    backgroundColor: "#FFFFFF",
    color: "#115e59",
    textAlign: "start",
    border: "1px solid #0F766E99",
    borderRadius: "0.25rem",
  };

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
  const handleType = (type) => {
    if (type !== "Select Type") {
      setFormData({
        ...formData,
        destinations_type: type,
      });
      setSelected(type);
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

    formDataToSend.append("title", formData.title);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("destinations_type", formData.destinations_type);
    axios
      .post(`http://localhost:3999/addDestinations`, formDataToSend, {
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
          <form action="" onSubmit={handleSubmit}>
            <div className="p-6 w-full">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl text-Base-color font-bold text-center mb-4 cursor-pointer">
                  Add new place
                </h1>
              </div>
              <div className="space-y-4">
                {/* image */}
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

                {/* title */}
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
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>

                {/* overview */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Overview
                  </label>
                  <textarea
                    name="details"
                    rows="4"
                    value={formData.details}
                    class="block p-2.5 w-full my-2 text-sm rounded border border-transparent-third-color outline-none"
                    placeholder="Enter a description or an overview about the place..."
                    required
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                {/* city */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    City
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City"
                    value={formData.location}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>

                {/* country */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>

                {/* Type */}
                <div className="text-start">
                  <div className="my-2">
                    <label className="text-sm font-medium text-Base-color">
                      Type
                    </label>
                  </div>
                  <div>
                    <Dropdown
                      label={selected}
                      placement="right-start"
                      style={dropdownStyles}
                    >
                      <Dropdown.Item
                        onClick={() => {
                          handleType("Beach");
                        }}
                      >
                        Beach
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleType("Mountain");
                        }}
                      >
                        Mountain
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleType("Forest");
                        }}
                      >
                        Forest
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleType("City");
                        }}
                      >
                        City
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="mt-4 m-2 py-2 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-sky-900"
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

export default AddDestination;

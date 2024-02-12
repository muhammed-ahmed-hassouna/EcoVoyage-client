import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { Dropdown } from "flowbite-react";
import { Checkbox, Label } from "flowbite-react";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";

const UpdateHouse = ({ id }) => {
  const [formData, setFormData] = useState([]);
  const { onSelectedPage, page } = usePage();

  const [selected, setSelected] = useState("Select rating");
  const [selectedType, setSelectedType] = useState("inside");
  const [isPool, setIsPool] = useState(false);
  const [isFreeWifi, setIsFreeWifi] = useState(false);
  const [isParking, setParking] = useState(false);
  const { headers } = useAuth();
  const [amenities, setAmenities] = useState([]);
  const [amenitiestInput, setAmenitiesInput] = useState("");

  const dropdownStyles = {
    backgroundColor: "#FFFFFF",
    color: "#115e59",
    textAlign: "start",
    border: "1px solid #0F766E99",
    borderRadius: "0.25rem",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3999/getAccommodationsByID/${id}`)
      .then((response) => {
        // Handle the response data here
        setFormData(response.data[0]);
        setAmenities(response.data[0].amenities)
        setSelectedType(response.data[0].type.toLowerCase())
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  const addTag = (e) => {
    e.preventDefault();
    if (amenitiestInput.trim() !== "" && !amenities.includes(amenitiestInput)) {
      setAmenities([...amenities, amenitiestInput]);
      setAmenitiesInput("");
    }
  };
  const removeTag = (index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        [name]: e.target.files,
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
    setFormData({
      ...formData,
      type: selectedType === "inside" ? "inside" : "outside",
      amenities: amenities,
    });
    if (selected !== "Select rating") {
      setFormData({
        ...formData,
        rating: selected.replace(/\D/g, ""),
      });
      axios
        .put(`http://localhost:3999/updateAccommodation/${id}`, formData, {
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
            }
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
            }
          });
        });
    }
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
                  Update Accommodation
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
                    class="block w-full text-md file:bg-fourth-color file:hover:bg-light-pink/20 file:border-0 file:text-second-color file:hover:text-fourth-color  text-Base-color border border-transparent-third-color rounded cursor-pointer bg-second-color focus:outline-none file:py-2 file:px-4"
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
                    value={formData && formData.title}
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
                    name="activity_details"
                    rows="4"
                    value={formData && formData.accommodation_details}
                    class="block p-2.5 w-full my-2 text-sm rounded border border-transparent-third-color outline-none"
                    placeholder="Enter a description or an overview about the place..."
                    required
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                {/* price */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="pricing"
                    placeholder="Enter the country the place in"
                    value={formData && formData.pricing}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>

                {/* location */}
                <div className="flex flex-col md:flex-row text-start gap-5">
                  <div className="w-full md:w-auto">
                    <label className="text-sm font-medium text-Base-color">
                      City
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="City"
                      value={formData && formData.location}
                      required
                      onChange={(e) => handleChange(e)}
                      className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                    />
                  </div>
                  <div className="w-full md:w-auto">
                    <label className="text-sm font-medium text-Base-color">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData && formData.country}
                      required
                      onChange={(e) => handleChange(e)}
                      className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                    />
                  </div>
                </div>

                {/* type */}
                <div className="text-start">
                  <div className="my-2">
                    <label className="text-sm font-medium text-Base-color">
                      Type
                    </label>
                  </div>
                  <div className="flex flex-col md:flex-row text-start gap-8">
                    <div className="flex items-center gap-1">
                      <input
                        className="relative h-5 w-5 rounded-full border-2 border-solid border-third-color checked:border-third-color hover:cursor-pointer  focus:shadow-none focus:outline-none focus:ring-0  checked:focus:border-third-color text-third-color"
                        type="radio"
                        name="type"
                        id="indoor"
                        value="inside"
                        checked={selectedType === "inside"}
                        onChange={() => setSelectedType("inside")}
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="indoor"
                      >
                        Indoor
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        className="relative h-5 w-5 rounded-full border-2 border-solid border-third-color checked:border-third-color hover:cursor-pointer  focus:shadow-none focus:outline-none focus:ring-0  checked:focus:border-third-color text-third-color"
                        type="radio"
                        name="type"
                        id="outdoor"
                        value="outside"
                        checked={selectedType === "outside"}
                        onChange={() => setSelectedType("outside")}
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="outdooe"
                      >
                        Outdoor
                      </label>
                    </div>
                  </div>
                </div>

                {/* rating */}
                <div className="text-start">
                  <div className="my-2">
                    <label className="text-sm font-medium text-Base-color">
                      Rating
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
                          setSelected("5 Stars");
                        }}
                      >
                        5 Stars
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("4 Stars");
                        }}
                      >
                        4 Stars
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("3 Stars");
                        }}
                      >
                        3 Stars
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("2 Stars");
                        }}
                      >
                        2 Stars
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("1 Stars");
                        }}
                      >
                        1 Stars
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>

                {/* amenities */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Amenities
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={amenitiestInput}
                        onChange={(e) => setAmenitiesInput(e.target.value)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={(e) => {
                          addTag(e);
                        }}
                        className="m-2 py-3 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-fourth-color"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {amenities.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-light-pink/20 border border-light-pink/60 text-fourth-color rounded-md px-2 py-1 m-1 flex items-center"
                        >
                          <span className="mr-1">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-fourth-color/80 hover:text-fourth-color focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="mt-4 m-2 py-2 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-fourth-color"
                >
                  Update
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

export default UpdateHouse;

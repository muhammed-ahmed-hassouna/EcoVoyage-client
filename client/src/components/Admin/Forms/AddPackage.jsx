import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";

const AddPackage = () => {
  const [formData, setFormData] = useState([]);
  const { onSelectedPage } = usePage();

  const [highlight, setHighlight] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [itinerary, setItinerary] = useState([]);
  const [itineraryInput, setItineraryInput] = useState("");
  const [inclusion, setInclusion] = useState([]);
  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusion, setExclusion] = useState([]);
  const [exclusionInput, setExclusionInput] = useState("");
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

    formData.itinerary = Object.fromEntries(
      itinerary.map((item, index) => [`Day ${index + 1}`, item])
    );
    formData.inclusions = Object.fromEntries(
      inclusion.map((item, index) => [`Inc ${index + 1}`, item])
    );
    formData.exclusions = Object.fromEntries(
      exclusion.map((item, index) => [`Exc ${index + 1}`, item])
    );
    formData.highlights = Object.fromEntries(
      highlight.map((item, index) => [`high ${index + 1}`, item])
    );

    const itineraryJSON = JSON.stringify(formData.itinerary);
    const inclusionsJSON = JSON.stringify(formData.inclusions);
    const exclusionsJSON = JSON.stringify(formData.exclusions);
    const highlightsJSON = JSON.stringify(formData.highlights);
    const formDataToSend = new FormData();
    if (formData.files) {
      formData.files.forEach((file, index) => {
        formDataToSend.append(`files[]`, file);
      });
    }
    // Append other form data fields
    formDataToSend.append("cost", formData.cost);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("exclusions", exclusionsJSON);
    formDataToSend.append("highlights", highlightsJSON);
    formDataToSend.append("inclusions", inclusionsJSON);
    formDataToSend.append("itinerary", itineraryJSON);
    formDataToSend.append("overview", formData.overview);
    formDataToSend.append("title", formData.title);

    axios
      .post(`http://localhost:3999/addPackages`, formDataToSend, {
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
  const addTag = (e, input) => {
    e.preventDefault();
    if (input === "highlight") {
      if (highlightInput.trim() !== "" && !highlight.includes(highlightInput)) {
        setHighlight([...highlight, highlightInput]);
        setHighlightInput("");
      }
    } else if (input === "itinerary") {
      if (itineraryInput.trim() !== "" && !itinerary.includes(itineraryInput)) {
        setItinerary([...itinerary, itineraryInput]);
        setItineraryInput("");
      }
    } else if (input === "inclusion") {
      if (inclusionInput.trim() !== "" && !inclusion.includes(inclusionInput)) {
        setInclusion([...inclusion, inclusionInput]);
        setInclusionInput("");
      }
    } else if (input === "exclusion") {
      if (exclusionInput.trim() !== "" && !exclusion.includes(exclusionInput)) {
        setExclusion([...exclusion, exclusionInput]);
        setExclusionInput("");
      }
    }
  };

  const removeTag = (index, input) => {
    if (input === "highlight") {
      const updatedHighlight = [...highlight];
      updatedHighlight.splice(index, 1);
      setHighlight(updatedHighlight);
    } else if (input === "itinerary") {
      const updatedItinerary = [...itinerary];
      updatedItinerary.splice(index, 1);
      setItinerary(updatedItinerary);
    } else if (input === "inclusion") {
      const updatedInclusion = [...inclusion];
      updatedInclusion.splice(index, 1);
      setInclusion(updatedInclusion);
    } else if (input === "exclusion") {
      const updatedExclusion = [...exclusion];
      updatedExclusion.splice(index, 1);
      setExclusion(updatedExclusion);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center top-64 items-center lg:ml-28 h-full w-auto">
        <div className="lg:w-2/3 w-full bg-transparent-first-color p-6 rounded shadow-lg h-auto m-6">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="p-6 w-full">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl text-Base-color font-bold text-center mb-4 cursor-pointer">
                  Add Package
                </h1>
              </div>
              <div className="space-y-4">
                {/* upload image */}
                <div className="text-start">
                  <label
                    class="block mb-2 text-sm font-medium text-Base-color"
                    for="multiple_files"
                  >
                    Upload Image
                  </label>
                  <input
                    class="block w-full text-md file:bg-fourth-color file:hover:bg-second-color file:border-0 file:text-second-color file:hover:text-fourth-color  text-Base-color border border-transparent-third-color rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none file:py-2 file:px-4"
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
                    name="overview"
                    rows="4"
                    value={formData.overview}
                    class="block p-2.5 w-full my-2 text-sm rounded border border-transparent-third-color outline-none"
                    placeholder="Enter a description or an overview about the place..."
                    required
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                {/* highlight */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-Base-color">
                    Highlights
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={(e) => {
                          addTag(e, "highlight");
                        }}
                        className="m-2 py-3 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-Base-color"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {highlight.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-light-pink/20 border border-light-pink/60 text-fourth-color rounded-md px-2 py-1 m-1 flex items-center"
                        >
                          <span className="mr-1">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index, "highlight")}
                            className="text-fourth-color/80 hover:text-fourth-color focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* itinerary */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-Base-color">
                    Itinerary
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={itineraryInput}
                        onChange={(e) => setItineraryInput(e.target.value)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={(e) => {
                          addTag(e, "itinerary");
                        }}
                        className="m-2 py-3 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-fourth-color"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {itinerary.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-light-pink/20 border border-light-pink/60 text-fourth-color rounded-md px-2 py-1 m-1 flex items-center"
                        >
                          <span className="mr-1">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index, "itinerary")}
                            className="text-fourth-color/80 hover:text-fourth-color focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* inclusions */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-Base-color">
                    Inclusions
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={inclusionInput}
                        onChange={(e) => setInclusionInput(e.target.value)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={(e) => {
                          addTag(e, "inclusion");
                        }}
                        className="m-2 py-3 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-Base-color"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {inclusion.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-light-pink/20 border border-light-pink/60 text-fourth-color rounded-md px-2 py-1 m-1 flex items-center"
                        >
                          <span className="mr-1">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index, "inclusion")}
                            className="text-fourth-color/80 hover:text-fourth-color focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* exclusion */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-Base-color">
                    Exclusions
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={exclusionInput}
                        onChange={(e) => setExclusionInput(e.target.value)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={(e) => {
                          addTag(e, "exclusion");
                        }}
                        className="m-2 py-3 px-5 border-2 border-fourth-color bg-fourth-color hover:bg-second-color rounded text-second-color hover:text-Base-color"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap">
                      {exclusion.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-light-pink/20 border border-light-pink/60 text-fourth-color rounded-md px-2 py-1 m-1 flex items-center"
                        >
                          <span className="mr-1">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index, "exclusion")}
                            className="text-fourth-color/80 hover:text-fourth-color focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* country */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-Base-color">
                    Country
                  </label>
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={(e) => handleChange(e)}
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                {/* cost */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost"
                    placeholder="Enter the country the place in"
                    value={formData.cost}
                    required
                    onChange={(e) => handleChange(e)}
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
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

export default AddPackage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { useAuth } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { Dropdown } from "flowbite-react";
import DatetimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddFlight = () => {
  const [formData, setFormData] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { onSelectedPage } = usePage();
  const [title, setTitle] = useState("");
  const [departTime, setDepartTime] = useState([]);
  const [returnTime, setReturnTime] = useState([]);
  const { headers } = useAuth();
  const [time, setTime] = useState("");
  const dropdownStyles = {
    backgroundColor: "#FFFFFF",
    color: "#115e59",
    width: "100%",
    textAlign: "start",
    border: "1px solid #0F766E99",
    borderRadius: "0.25rem",
  };
  useEffect(() => {
    axios.get("http://localhost:3999/getDestinations").then((response) => {
      setDestinations(response.data);
    });
  }, [1]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    } else if (name === "boardingD") {
      setDepartTime({
        ...departTime,
        boarding: value,
      });
    } else if (name === "arrivalD") {
      setDepartTime({
        ...departTime,
        arrival: value,
      });
    } else if (name === "boardingR") {
      setReturnTime({
        ...returnTime,
        boarding: value,
      });
    } else if (name === "arrivalR") {
      setReturnTime({
        ...returnTime,
        arrival: value,
      });
    } else if (name === "hours") {
      setTime({
        ...time,
        hours: value,
      });
    } else if (name === "minutes") {
      setTime({
        ...time,
        minutes: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleDestination = (id, title) => {
    setFormData({
      ...formData,
      destinations_id: id,
    });
    setTitle(title);
  };
  useEffect(() => {
    setFormData({
      ...formData,
      depart_date: startDate,
      depart_time: departTime,
      return_date: endDate,
      return_time: returnTime,
      average: `${time.hours}h ${time.minutes}m`,
    });
  }, [departTime, returnTime, time, startDate, endDate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const departTimeJSON = JSON.stringify(formData.depart_time);
    const returnTimeJSON = JSON.stringify(formData.return_time);
    const departDateJSON = formData.depart_date.toJSON();
    const returnDateJSON = formData.return_date.toJSON();

    const formDataToSend = new FormData();
    if (formData.files) {
      formData.files.forEach((file, index) => {
        formDataToSend.append(`files[]`, file);
      });
    }

    // Append other form data fields if needed
    formDataToSend.append("average", formData.average);
    formDataToSend.append("best", formData.best);
    formDataToSend.append("economy", formData.economy);
    formDataToSend.append("business", formData.business);
    formDataToSend.append("first", formData.first);
    formDataToSend.append("depart_time", departTimeJSON);
    formDataToSend.append("return_time", returnTimeJSON);
    formDataToSend.append("depart_date", departDateJSON);
    formDataToSend.append("return_date", returnDateJSON);
    formDataToSend.append("destinations_id", formData.destinations_id);
    formDataToSend.append("operatedby", formData.operatedby);

    axios
      .post(`http://localhost:3999/addFlight`, formDataToSend, {
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
                  Add Flight
                </h1>
              </div>
              <div className="space-y-4">
                {/* destination */}
                <div className="text-start">
                  <div className="my-2">
                    <label className="text-sm font-medium text-Base-color">
                      Destination
                    </label>
                  </div>
                  <div>
                    <Dropdown
                      label={
                        formData.destinations_id ? title : "Select Destination"
                      }
                      placement="bottom"
                      style={dropdownStyles}
                    >
                      <div className="h-36 overflow-auto">
                        {destinations &&
                          destinations.map((place, id) => (
                            <Dropdown.Item
                              key={id}
                              onClick={() => {
                                handleDestination(
                                  place.destinations_id,
                                  place.title
                                );
                              }}
                              className="text-Base-color font-bold"
                            >
                              {place.title}
                            </Dropdown.Item>
                          ))}
                      </div>
                    </Dropdown>
                  </div>
                </div>

                {/* price */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Cost
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="best"
                    value={formData.best}
                    placeholder="Price"
                    onChange={(e) => handleChange(e)}
                    required
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>

                {/* operated by */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Operated by
                  </label>
                  <input
                    type="text"
                    name="operatedby"
                    value={formData.operatedby}
                    placeholder="Enter Airline"
                    onChange={(e) => handleChange(e)}
                    required
                    className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                  />
                </div>
                {/* upload image */}
                <div className="text-start">
                  <label
                    class="block mb-2 text-sm font-medium text-Base-color"
                    for="multiple_files"
                  >
                    Upload Image
                  </label>
                  <input
                    class="block w-full text-md file:bg-fourth-color file:hover:bg-white file:border-0 file:text-white file:hover:text-fourth-color file:hover:bg-light-pink/20 text-Base-color border border-transparent-third-color rounded cursor-pointer bg-second-color focus:outline-none file:py-2 file:px-4"
                    name="image"
                    onChange={(e) => handleChange(e)}
                    type="file"
                    multiple
                  />
                </div>

                {/* average */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Flight Average
                  </label>
                  <div className="flex flex-wrap gap-5 w-full">
                    <div className="w-full md:w-2/5 flex flex-nowrap items-center gap-3">
                      <input
                        type="number"
                        name="hours"
                        value={time.hours}
                        placeholder="Hours"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded border border-transparent-third-color outline-none"
                      />
                      <label className="text-sm font-medium text-Base-color">
                        hours
                      </label>
                    </div>
                    <div className="w-full md:w-2/5 flex flex-nowrap items-center gap-3">
                      <input
                        type="number"
                        name="minutes"
                        value={time.minutes}
                        placeholder="Minutes"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded border border-transparent-third-color outline-none"
                      />
                      <label className="text-sm font-medium text-Base-color">
                        minutes
                      </label>
                    </div>
                  </div>
                </div>

                {/* seats */}
                <div className="text-start">
                  <label className="text-sm font-medium text-Base-color">
                    Number of seats
                  </label>
                  <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/3 flex flex-nowrap items-center gap-2">
                      <label className="text-sm font-medium text-Base-color">
                        Economy
                      </label>
                      <input
                        type="number"
                        name="economy"
                        value={formData && formData.economy}
                        placeholder="Economy Class"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded border border-transparent-third-color outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/3 flex flex-nowrap items-center gap-2">
                      <label className="text-sm font-medium text-Base-color">
                        Business
                      </label>
                      <input
                        type="number"
                        name="business"
                        value={formData && formData.business}
                        placeholder="Business Class"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded border border-transparent-third-color outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/3 flex flex-nowrap items-center gap-2">
                      <label className="text-sm font-medium text-Base-color">
                        First
                      </label>
                      <input
                        type="number"
                        name="first"
                        value={formData && formData.first}
                        placeholder="First Class"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded border border-transparent-third-color outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* depart */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700">
                    Depart
                  </label>
                  <div className="flex flex-wrap gap-5">
                    <DatetimePicker
                      selected={startDate}
                      name="depart_date"
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      placeholderText="Start Date"
                      className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none focus:border-third-color"
                      calendarClassName="custom-calendar"
                    />
                    <div>
                      <input
                        type="text"
                        name="boardingD"
                        value={departTime.boarding}
                        placeholder="00:00"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 mb-2 rounded w-full border border-transparent-third-color outline-none"
                      />
                      <input
                        type="text"
                        name="arrivalD"
                        value={departTime.arrival}
                        placeholder="00:00"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* return */}
                <div className="text-start">
                  <label className="block text-sm font-medium text-gray-700">
                    Return
                  </label>
                  <div className="flex flex-wrap gap-5">
                    <DatetimePicker
                      selected={endDate}
                      name="return_date"
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none focus:border-third-color"
                      calendarClassName="custom-calendar"
                    />
                    <div>
                      <input
                        type="text"
                        name="boardingR"
                        value={returnTime.boarding}
                        placeholder="00:00"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 mb-2 rounded w-full border border-transparent-third-color outline-none"
                      />
                      <input
                        type="text"
                        name="arrivalR"
                        value={returnTime.arrival}
                        placeholder="00:00"
                        onChange={(e) => handleChange(e)}
                        required
                        className="block text-sm py-3 px-4 my-2 rounded w-full border border-transparent-third-color outline-none"
                      />
                    </div>
                  </div>
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

export default AddFlight;

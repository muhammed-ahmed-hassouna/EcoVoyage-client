import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearching } from "../../Context/SearchHomePage";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { searchResult, setSearchResult } = useSearching([]);
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = { day: "numeric", month: "short", year: "numeric" };

    axios
      .get(`http://localhost:3999/getFlights`)
      .then((response) => {
        let newData = response.data.map((data) => {
          const departDate = new Date(data.depart_date).toLocaleDateString(
            "en-US",
            options
          );
          const returnDate = new Date(data.return_date).toLocaleDateString(
            "en-US",
            options
          );
          const [departDay, departYear] = departDate.split(", ");
          const [returnDay, returnYear] = returnDate.split(", ");
          return {
            ...data,
            depart_day: departDay,
            depart_year: departYear,
            return_day: returnDay,
            return_year: returnYear,
          };
        });
        setFlights(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearch(true);
    setSearchResult(flights);
    let search = flights;
    if (formData.destination) {
      setSearchResult(
        search.filter((flight) =>
          flight.destination_name
            .toLowerCase()
            .includes(formData.destination.toLowerCase())
        )
      );
      search = search.filter((flight) =>
        flight.destination_name
          .toLowerCase()
          .includes(formData.destination.toLowerCase())
      );
    }

    if (formData.price) {
      setSearchResult(search.filter((flight) => flight.best <= formData.price));
      search.filter((flight) => flight.best <= formData.price);
    }

    if (formData.from) {
      setSearchResult(search.filter((flight) => flight.best <= formData.price));
      search.filter((flight) => flight.best <= formData.price);
    }

    if (formData.to) {
      setSearchResult(
        search.filter(
          (flight) =>
            new Date(flight.depart_date).toISOString() >=
            new Date(formData.from).toISOString()
        )
      );
      search.filter(
        (flight) =>
          new Date(flight.return_date).toISOString() <=
          new Date(formData.to).toISOString()
      );
    }
    navigate("/flights");
  };
  return (
    <>
      <section class="mb-16">
        <div class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[600px] md:h-[560px] bg-[url('https://ik.imgkit.net/3vlqs5axxjf/TAW/uploadedImages/Professional_Development/Opinion/VirtuosoSustainability2022_Hero.jpg?tr=w-1200%2Cfo-auto')]">
          <div class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-transparent-fourth-color">
            <div class="flex flex-col h-full items-center justify-center">
              <div class="px-6 text-second-color text-left md:px-12">
                <h1 class="mt-6 mb-16 text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl">
                  Plan Your Eco-Friendly Adventure <br />
                  <span className="text-base md:text-2xl xl:text-3xl font-normal">
                    Start Planning Your Eco-Friendly Trip Today!
                  </span>
                </h1>
              </div>
              <div className="w-full px-10">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex flex-col gap-6 md:flex-row items-center justify-center p-6 w-full container rounded-lg md:h-24 bg-transparent-third-color"
                >
                  <input
                    class="shadow rounded py-2 px-3 bg-second-color text-third-color w-full md:w-1/4"
                    type="text"
                    name="destination"
                    onChange={(e) => handleChange(e)}
                    placeholder="Where are you going?"
                  />
                  <input
                    class="shadow rounded py-2 px-3 bg-second-color text-third-color w-full md:w-1/4"
                    type="number"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter your budget"
                  />
                  <input
                    class="shadow rounded py-2 px-3 bg-second-color text-third-color w-full md:w-1/4"
                    name="from"
                    type="date"
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    class="shadow rounded py-2 px-3 bg-second-color text-third-color w-full md:w-1/4"
                    name="to"
                    type="date"
                    onChange={(e) => handleChange(e)}
                  />
                  <button class="border-fourth-color border-2 hover:bg-second-color bg-fourth-color hover:text-fourth-color text-second-color font-bold py-2 px-4 rounded w-full md:w-1/4">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="search"></div>
      </section>
    </>
  );
};

export default Hero;

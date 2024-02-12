import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonials = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3999/getContact")
      .then((response) => {
        // Handle the response data here
        setTestimonials(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  const handleNext = () => {
    if (activeItem < testimonials.length - 1) {
      setActiveItem(activeItem + 1);
    } else {
      setActiveItem(0);
    }
  };

  const handlePrevious = () => {
    if (activeItem > 0) {
      setActiveItem(activeItem - 1);
    } else {
      setActiveItem(testimonials.length - 1);
    }
  };

  return (
    <div>
      <div className="container mt-24 mx-auto md:px-6">
        {/* <!-- Section: Design Block --> */}
        <section className="mb-32 text-center">
          <h1 className="text-third-color text-4xl md:text-start md:mx-32 font-bold py-10">
            Testimonials
          </h1>
          <div
            id="carouselExampleCaptions"
            className="relative"
            data-te-carousel-init
            data-te-carousel-slide
          >
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              {testimonials.map((testimonial, id) => (
                <div
                  key={id}
                  className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                    activeItem === id ? "block" : "hidden"
                  }`}
                  data-te-carousel-item
                >
                  <div className="flex flex-wrap justify-center p-5">
                    <div className="w-full text-start mx-8 md:mx-0 px-10 lg:w-8/12 py-4 rounded-xl bg-transparent-first-color">
                      <h5 className=" text-lg text-Base-color font-bold">
                        {testimonial.fullname}
                      </h5>

                      <div className="flex items-center">
                        <p className="=text-sm mb-3 text-third-color">
                          {testimonial.email}
                        </p>
                      </div>
                      <p className="mb-6 text-third-color">
                        {testimonial.message}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 96 960 960"
                          className="inline-block w-6"
                        >
                          <path
                            fill="currentColor"
                            d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handlePrevious}
              className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide="prev"
            >
              <span className="inline-block h-8 w-8">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="text-neutral-600"
                >
                  <path
                    fill="currentColor"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </span>
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Previous
              </span>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide="next"
            >
              <span className="inline-block h-8 w-8">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="text-neutral-600"
                >
                  <path
                    fill="currentColor"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Next
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
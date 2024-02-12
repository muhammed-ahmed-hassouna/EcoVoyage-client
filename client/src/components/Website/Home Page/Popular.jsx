import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Popular = () => {
  
    const [destinations, setDestinations] = useState([]);

  // fetch products
  useEffect(() => {
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true, // Only run the animation once
      });

    axios
      .get("http://localhost:3999/getDestinations")
      .then((response) => {
        // Handle the response data here
        const limitedData = response.data.slice(0, 2);

        setDestinations(response.data.slice(0, 3));
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="mb-20">
      <h1 className="text-third-color text-4xl md:text-start md:mx-32 font-bold py-10">
        Popular Destinations
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-center mx-auto">
        {destinations.map((destination, id)=>(
        <Link key={id} to={`/destination/${destination.destinations_id}`}>
          <article data-aos="fade-up" className="max-w-[20rem] shadow-xl bg-cover bg-center overflow-hidden h-[490px] transform duration-500 hover:-translate-y-2 cursor-pointer group" style={{ backgroundImage: `url(${destination.destinationimage})` }}>
            <div className="text-start hover:bg-transparent-second-color bg-transparent-fourth-color bg-opacity-20 h-full px-5 flex flex-wrap flex-col pt-60 hover:bg-opacity-75 transform duration-300">
              <h1 className="text-second-color text-2xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                {destination.title}
              </h1>
              <div className="w-16 h-2 bg-fourth-color rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
              <p className="my-3 py-3 opacity-0 max-h-[95px] overflow-hidden text-second-color text-xl group-hover:opacity-80 transform duration-500">
                {destination.details}
              </p>
            </div>
          </article>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;

//image is not from the server but static one
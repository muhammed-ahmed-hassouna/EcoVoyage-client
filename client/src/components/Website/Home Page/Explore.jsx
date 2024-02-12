import React from "react";

const Explore = () => {
  return (
    <div className="mb-16">
      <div className="mx-5 md:mx-20 h-[500px] object-fill bg-no-repeat bg-cover bg-center bg-[url('https://healthmatters.nyp.org/wp-content/uploads/2020/06/travel-during-coronavirus-outbreak-hero.gif')]">
        <div className="w-full h-full px-5 flex flex-col flex-wrap justify-center items-center">
          <p className="py-3 text-lg md:text-2xl lg:text-3xl text-Base-color">
            Can't decide where to go?
          </p>
          <h1 className="py-3 text-Base-color text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Explore every destination
          </h1>
          <button className="border-fourth-color border-2 my-5 hover:bg-second-color bg-fourth-color hover:text-fourth-color text-second-color font-bold py-2 px-4 rounded w-2/3 md:w-1/3"
          onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}
          >
            Search everywhere
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;

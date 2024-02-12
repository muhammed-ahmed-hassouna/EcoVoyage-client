import React from 'react';
import notFound from '../assests/Images/404.png';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <div className="w-96">
          <img src={notFound} />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="text-Base-color font-bold text-2xl">
            Oops, Page Not Found
          </h3>
          <p className="text-Base-color">
            We suggest you go to Home page while we fix the problem!!
          </p>
          {/* <Link to="/" className="w-full md:w-auto"> */}
            <button onClick={(e)=>navigate(-1)} className="w-full md:w-auto border rounded py-3 px-10 text-center border-third-color bg-third-color hover:bg-second-color text-second-color hover:text-third-color focus:outline-none">
              Go Back!
            </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default NotFound

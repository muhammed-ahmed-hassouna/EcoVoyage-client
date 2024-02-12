import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only run the animation once
    });
  });

  return (
    <>
      {/* <div className="h-full flex flex-col justify-center bg-no-repeat items-center gap-16 py-8 bg-cover bg-[url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <h1 className="mt-5 text-4xl font-bold text-second-color leading-snug  min-h-33">
          Learn more about us
        </h1>
        <article
          data-aos="fade-right"
          className="text-start flex flex-col gap-8 md:mr-[30rem] p-10 min-h-116 max-w-2xl w-full rounded-xl text-second-color xl:col-span-2 bg-center bg-cover bg-[#000000d2]/70"
        >
          <h1 className="mt-5 text-2xl md:text-4xl font-bold text-second-color leading-snug  min-h-33">
            WHAT WE DO
          </h1>
          <div className="w-full pr-9 h-2 bg-fourth-color rounded-full mb-5"></div>
          <div className="">
            <span className="text-lg md:text-xl">
              At EcoVoyage, we are dedicated to offering eco-conscious travel
              experiences that leave a positive impact on the environment. Our
              services include eco-lodges and low-impact adventure tours. We
              actively work to reduce our carbon footprint, protect local
              ecosystems, and support communities for sustainable travel.
            </span>
          </div>
        </article>
        <article
          data-aos="fade-left"
          className="text-start flex flex-col gap-8 md:ml-[35rem] p-10 min-h-116 max-w-2xl w-full rounded-xl text-second-color xl:col-span-2 bg-center bg-cover bg-[#000000d2]/70"
        >
          <h1 className="mt-5 text-2xl md:text-4xl font-bold text-second-color leading-snug  min-h-33">
            WHAT WE BELIEVE
          </h1>
          <div className="w-full pr-9 h-2 bg-fourth-color rounded-full mb-5"></div>
          <div className="m-10">
            <span className="text-lg md:text-xl">
              Our core belief is that every journey should preserve the natural
              beauty of our planet. We advocate for responsible travel practices
              that respect local cultures and ecosystems while promoting
              environmental awareness. We are committed to reducing single-use
              plastics, supporting wildlife conservation, and engaging in
              eco-friendly tourism practices. Join us in the belief that every
              step we take today can lead to a greener tomorrow.
            </span>
          </div>
        </article>
      </div>
      <div className="my-10 flex flex-col-reverse md:flex-row justify-center items-center gap-8 text-Base-color">
        <div data-aos="fade-right" className="max-w-xl m-5">
          <h1 className="mt-5 text-start text-2xl md:text-4xl font-bold text-sky-00 leading-snug text-third-color min-h-33">
            Why choose us?
          </h1>
          <div className="text-lg md:text-xl text-start my-3">
            <span>
              We are more than just a travel provider; we are your partners in
              sustainable adventures. Here's why we stand out:
            </span>
            <ol>
              <li>
                <b>Eco-Driven</b>: We're passionately committed to eco-friendly
                travel, minimizing our environmental impact at every step.
              </li>
              <li>
                <b>Local Connections</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Tailored Experiences</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Expert Guidance</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Sustainability Certified</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
            </ol>
          </div>
        </div>
        <div data-aos="fade-left" className="max-w-lg h-[489.5px]">
          <img
            className="w-full h-full object-cover"
            src="https://www.indivstock.com/static48/preview1/stock-photo-abstract-holiday-and-beach-concept-with-a-airplane-and-sun-lounger-on-the-beach-generative-ai-illustration-915450.jpg"
            alt=""
          />
        </div>
      </div> */}

      <div className="h-full flex flex-col justify-center bg-no-repeat items-center gap-8 md:gap-16 py-8 px-5 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-second-color leading-snug min-h-33">
          Learn more about us
        </h1>
        <article
          data-aos="fade-right"
          className="text-start flex flex-col gap-8 lg:ml-0 lg:mr-auto p-5 lg:p-10 min-h-116 max-w-2xl w-full rounded-xl text-second-color xl:col-span-2 bg-center bg-cover bg-[#000000d2]/70"
        >
          <h1 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-bold text-second-color leading-snug min-h-33">
            WHAT WE DO
          </h1>
          <div className="w-full pr-4 lg:pr-9 h-2 bg-fourth-color rounded-full mb-5"></div>
          <div className="text-lg md:text-xl">
            <span>
              At EcoVoyage, we are dedicated to offering eco-conscious travel
              experiences that leave a positive impact on the environment. Our
              services include eco-lodges and low-impact adventure tours. We
              actively work to reduce our carbon footprint, protect local
              ecosystems, and support communities for sustainable travel.
            </span>
          </div>
        </article>
        <article
          data-aos="fade-left"
          className="text-start flex flex-col gap-8 lg:mr-0 lg:ml-auto p-5 lg:p-10 min-h-116 max-w-2xl w-full rounded-xl text-second-color xl:col-span-2 bg-center bg-cover bg-[#000000d2]/70"
        >
          <h1 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-bold text-second-color leading-snug min-h-33">
            WHAT WE BELIEVE
          </h1>
          <div className="w-full pr-4 lg:pr-9 h-2 bg-fourth-color rounded-full mb-5"></div>
          <div className="text-lg md:text-xl">
            <span>
              Our core belief is that every journey should preserve the natural
              beauty of our planet. We advocate for responsible travel practices
              that respect local cultures and ecosystems while promoting
              environmental awareness. We are committed to reducing single-use
              plastics, supporting wildlife conservation, and engaging in
              eco-friendly tourism practices. Join us in the belief that every
              step we take today can lead to a greener tomorrow.
            </span>
          </div>
        </article>
      </div>
      <div className="my-10 mx-5 flex flex-col-reverse lg:flex-row justify-center items-center gap-8 text-Base-color">
        <div data-aos="fade-right" className="w-full m-5 lg:w-1/2">
          <h1 className="mt-5 text-start text-2xl md:text-4xl lg:text-5xl font-bold text-sky-00 leading-snug text-third-color min-h-33">
            Why choose us?
          </h1>
          <div className="text-lg md:text-xl text-start my-3">
            <span>
              We are more than just a travel provider; we are your partners in
              sustainable adventures. Here's why we stand out:
            </span>
            <ol>
              <li>
                <b>Eco-Driven</b>: We're passionately committed to eco-friendly
                travel, minimizing our environmental impact at every step.
              </li>
              <li>
                <b>Local Connections</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Tailored Experiences</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Expert Guidance</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
              <li>
                <b>Sustainability Certified</b>: We're passionately committed to
                eco-friendly travel, minimizing our environmental impact at
                every step.
              </li>
            </ol>
          </div>
        </div>
        <div data-aos="fade-left" className="w-full lg:w-1/2">
          <img
            className="w-full h-full object-cover"
            src="https://www.indivstock.com/static48/preview1/stock-photo-abstract-holiday-and-beach-concept-with-a-airplane-and-sun-lounger-on-the-beach-generative-ai-illustration-915450.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;

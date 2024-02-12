import React from 'react'
import service1 from "../../../assests/Images/service1.png"

const Services = () => {
  return (
    <div className='mb-16'>
      <div className='px-3 py-8 flex flex-col md:flex-row flew-wrap justify-center items-center gap-8'>
        <div className='flex md:w-1/4 flex-col justify-center items-center gap-4 p-4'>
            <img className='w-1/3' src={service1} alt="Search flight" />
            <h1 className='font-bold text-xl text-Base-color lg:text-2xl'>One search, all the flights</h1>
            <p className='text-Base-color'>We help you finds cheap flights on one click</p>
        </div>
        <div className='flex md:w-1/4 flex-col justify-center items-center gap-4 p-4'>
            <img className='w-1/3' src="https://ashleywrobel.com/wp-content/uploads/2021/05/compass.png" alt="Customize" />
            <h1 className='font-bold text-Base-color text-xl lg:text-2xl'>Customizable</h1>
            <p className='text-Base-color'>We help you customize your trips according to your preferences</p>
        </div>
        <div className='flex md:w-1/4 flex-col justify-center items-center gap-4 p-4'>
            <img className='w-1/3' src="https://clipart-library.com/2023/5023406.png" alt="Save Time" />
            <h1 className='font-bold text-Base-color text-xl lg:text-2xl'>Travel more, spend less</h1>
            <p className='text-Base-color'>We help you plan budget-friendly trips</p>
        </div>
      </div>
    </div>
  )
}

export default Services

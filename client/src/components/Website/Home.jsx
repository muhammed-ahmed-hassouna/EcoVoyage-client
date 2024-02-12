import React from 'react'
import Hero from '../Website/Home Page/Hero'
import Services from '../Website/Home Page/Services'
import Popular from '../Website/Home Page/Popular'
import Explore from '../Website/Home Page/Explore'
import Packages from '../Website/Home Page/Packages'
import Testimonials from '../Website/Home Page/Testimonials'
import PlaneAnimation from './Home Page/PlaneAnimation'

const Home = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div id='Home'>
        <Hero />
        <div className='relative h-36 overflow-hidden'>
        <PlaneAnimation />
      </div>
        <Services />
        <Popular />
        <Packages />
        <Explore />
        <Testimonials />
    </div>
  )
}

export default Home

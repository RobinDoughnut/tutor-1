import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Features from '../components/Features'
import Subjects from '../components/Subjects'
import FeaturedTutors from '../components/FeaturedTutors'
import About from '../components/About'


const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Subjects />
      <FeaturedTutors />
      <About />
      {/* <div className='max-padd-container bg-gray-900'>
        <Footer />
      </div> */}
    </>
  )
}

export default Home
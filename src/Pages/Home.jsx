import React from 'react'
import Banner from '../components/Banner'
import Services from '../components/Services'
import Download from '../components/Download'
import CategoryCards from '../components/Category'

const Home = () => {
  document.title = "ShopX"
  return (
    <div className='container mx-auto'>
      <Banner></Banner>
      <CategoryCards></CategoryCards>
      <Services></Services>
      <Download></Download>
    </div>
  )
}

export default Home
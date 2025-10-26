import React from 'react'
import Banner from '../components/Banner'
import Services from '../components/Services'
import Download from '../components/Download'
import CategoryCards from '../components/Category'
import { motion } from "framer-motion";
import FeaturedProducts from '../components/FeaturedProducts'
import RecentProducts from '../components/RecentProducts'
import Newsletter from '../components/Newsletter'


const Home = () => {
  document.title = "ShopX"
  return (
    <div className='container mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Banner></Banner>
      </motion.div>
      <CategoryCards></CategoryCards>
      <FeaturedProducts></FeaturedProducts>
      <Services></Services>
      <RecentProducts></RecentProducts>
      <Download></Download>
      <Newsletter></Newsletter>
    </div>
  )
}

export default Home
import React from 'react'
import Banner from '../components/Banner';
import BestSellerBooks from './Bestsellerbooks';
import FavBooks from './FavBooks';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';
import Reviews from './Reviews';
import MyFooter from '../components/MyFooter';

const Home = () => {
  return (
    <div>
     <Banner/>
     <BestSellerBooks/>
     <FavBooks/>
     <PromoBanner/>
     <OtherBooks/>
     <Reviews/>
    </div>
  )
}

export default Home;

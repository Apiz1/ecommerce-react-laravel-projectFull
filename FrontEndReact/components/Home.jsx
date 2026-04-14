import React from 'react';

import 'swiper/css';                     // Core styles
import LatestProduct from './common/LatestProduct';
import FeatureProduct from './common/FeatureProduct';
import Header from './common/Header';
import Footer from './common/Footer';
import Hero from './common/Hero';
import Layout from './common/Layout';
// Optional but recommended for better experience
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const Home = () => {
  return (
    <>
    <Layout>

    <Hero/>
      <LatestProduct/>
      
      <FeatureProduct/>
    </Layout>


    </>
  );
};

export default Home;
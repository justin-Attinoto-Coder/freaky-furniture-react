import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import Mobler from '../components/Mobler';
import Accordion from '../components/Accordion';

const Home = () => {
  return (
    <>
      <Hero />
      <NewsSection />
      <Mobler />
      <Accordion />
    </>
  );
};

export default Home;
import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <SearchBar />
      <Categories />
      <Carousel />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;

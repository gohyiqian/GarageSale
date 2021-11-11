import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Carousel from "../components/Carousel";
// import OpenSeaAPI from "../components/OpenSeaAPI";
// import PopChat from "../components/PopChat";

const Home = () => {
  // const msgs = ["hey whatsup!"];
  // const getMessage = (msg) => {
  //   console.log(msg);
  // };
  return (
    <div>
      {/* <OpenSeaAPI /> */}
      <Navbar />
      <Banner />
      <Carousel />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
      {/* <PopChat messages={msgs} getMessage={getMessage} /> */}
    </div>
  );
};

export default Home;

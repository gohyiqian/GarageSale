import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import ProductsList from "../components/ProductsList";
import Carousel from "../components/Carousel";
// import OpenSeaAPI from "../components/OpenSeaAPI";
// import PopChat from "../components/PopChat";

const HomePage = () => {
  // const msgs = ["hey whatsup!"];
  // const getMessage = (msg) => {
  //   console.log(msg);
  // };
  return (
    <div>
      {/* <OpenSeaAPI /> */}
      <NavBar />
      <Banner />
      <Carousel />
      <Categories />
      <ProductsList />
      <Newsletter />
      <Footer />
      {/* <PopChat messages={msgs} getMessage={getMessage} /> */}
    </div>
  );
};

export default HomePage;

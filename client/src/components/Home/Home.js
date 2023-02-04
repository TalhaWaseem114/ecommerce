import React from "react";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import Products from "./Products";
import AboutSection from "./AboutSection";
import Community from "./Community";
import Category from "./Category";
import Service from "../Service/Service";
import Newsletter from "./Newsletter";
import FilterCards from "./FilterCards";
import Hero from "./Hero";

export default function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Winkel</title>
      </Helmet>
      <Hero />
      <Products />
      <AboutSection />
      <Category />
      <FilterCards />
      <Community />
      <Service />
      <Newsletter />
    </div>
  );
}

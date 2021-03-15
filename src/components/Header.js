import React from "react";
import { useState, useEffect } from "react";
import eablogo from "../images/eab-logo-color.svg";
import Navigation from "./Navigation";
import "../scss/index.scss";

const Header = ({ title, locations }) => {
  const [pageUrl, setPage] = useState("landing");

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("location") || url.includes("instructions")) {
      setPage("not-landing");
    } else {
      setPage("landing");
    }
  }, []);

  return (
    <header
      className="site_header"
      data-page-name={pageUrl === "landing" ? "landing-page" : "location"}
    >
      <div className="eab_logo">
        <img src={eablogo} alt="EAB Global" />
        <div className="agency_services">Agency Services</div>
      </div>
      <div className="partner">{title}</div>
      <Navigation locations={locations} />
    </header>
  );
};

export default Header;

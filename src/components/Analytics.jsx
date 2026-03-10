import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// ⚠️ REPLACE THIS WITH YOUR ACTUAL ID FROM GOOGLE
const MEASUREMENT_ID = "G-PP0NNWXXZF"; 

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Google Analytics
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize(MEASUREMENT_ID);
      window.GA_INITIALIZED = true;
    }

    // 2. Send pageview data every time the route changes
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  return null; 
};
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from "react";
import StatusTableContainer from "../StatusTableContainer";
import Navigation from "../../components/Navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <StatusTableContainer />
    </>
  );
}

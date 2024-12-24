import React from "react";

const HomePage = ({ userName }) => {
  console.log(userName);

  return <h1 className="text-3xl font-bold underline">hello {userName}</h1>;
};

export default HomePage;

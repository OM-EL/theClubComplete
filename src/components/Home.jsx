import React from "react";
import home from "../assets/home.png";

const Home = () => {
  return (
    <div className="home" id="home">
      <div className="container">
        <div className="left">
          <p className="sub-title">Launching Soon</p>
          <h1 className="title"> Clubing like you have never experienced  </h1>
          <p className="description">
            Don't miss out on the release of our new NFT. mint one of the 3 NFT's and experience a new way of clubing.
          </p>
          <button href="#super-rare" >Mint one of the NFT below </button>
        </div>
        <div className="right">
          <div className="image" >
            <img src={home} alt="home" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;

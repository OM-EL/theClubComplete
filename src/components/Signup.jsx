import React from "react";
import mintNFT from "../assets/mintNFT.png";
import beu from "../assets/beu.png";
import door from "../assets/door.png";

const Signup = () => {
  return (
    <div className="signup" id="signup">
      <div className="container">
        <div className="left">
          <h1 className="title">Mint your NFT</h1>
          <p className="description">
            Mint a  gold silver , or bronze NFT.
          </p>
        </div>
        <div className="right">
          <div className="image">
            <img src={mintNFT} alt="signup" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>


      <div className="container">
        <div className="right">
          <div className="image">
            <img src={door} alt="signup" />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
        <div className="left">
          <h1 className="title">Present your nft at the club's door </h1>
          <p className="description">
            show the bouncer you NFT and start the VIP experience.
          </p>
        </div>

      </div>


      <div className="container">
        <div className="left">
          <h1 className="title">Club like you never did before</h1>
          <p className="description">
            Club like you never did before
          </p>
        </div>
        <div className="right">
          <div className="image">
            <img  src={beu} alt="signup" />
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

export default Signup;

import React from "react";
import icon from "../assets/icon.png";
import { freeNFTData } from "../data";
import Card from "./Card";

const Free = () => {
  return (
    <div className="free" id="freebies">
      <div className="container">
        <div className="background">
          <div className="ellipse pink"></div>
          <div className="ellipse green"></div>
        </div>
        <div className="content">
          <div className="image">
            <img src={icon} alt="icon" />
          </div>
          <h2 className="title">Free NFT for early minters</h2>
          <p className="description">
            Mint an NFT and take your chance of getting an air drop of two gold memberships
          </p>
        </div>
      </div>
      <div className="cards">
        {freeNFTData.map((item, index) => (
          <div className={`card${index + 1}`} key={index}>
            <Card
              image={item.image}
              series={item.series}
              title={item.title}
              price={item.price}
              tag={item.tag}
              time={item.time}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Free;

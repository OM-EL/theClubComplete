import React, {useState} from "react";
import { superRareData } from "../data";
import Card from "./Card";
import TheClubMembership from '../assets/TheClubMembership.json'
import {BigNumber, ethers} from "ethers";


 const mintMembershipCart = (plan) => {
     console.log("Minting " + plan );
}
const TheClubMembershipAddress = "0x7d471EAfFB35A0457Cc7e1848d04EA514E7EE9e5";


async function handleMint() {
    if(window.ethereum) {
        const provider = new ethers.providers.AlchemyWebSocketProvider(80001 , "kwfqNgqlwbwESMhd0GTlt3sXvi6O3SIu" );
        await provider.send('eth_accounts', []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            TheClubMembershipAddress,
            TheClubMembership.abi,
            signer
        );
        try{
            const response = await contract.mint(BigNumber.from(1));
            console.log('response: ' , response);
        } catch (err) {
            console.log("error: " , err);
        }
    }
}

const SuperRare = ( {accounts , setAccounts}) => {

  return (
    <div className="super-rare" id="super-rare">
      <div className="title-container">
        <h2 className="title">NFT Categories</h2>
        <p className="description">
          We have released four limited edition NFT's early which can be bid on
          via <a href="#home">OpenSea</a>
        </p>
      </div>
      <div className="cards">
        {superRareData.map((item, index) => (
            <div >


            <Card
            image={item.image}
            series={item.series}
            title={item.title}
            price={item.price}
            tag={item.tag}
            time={item.time}
            key={index}
          />
               isConnected ? {
                    <button className="brand-container" onClick={() => handleMint()} >Mint {item.title} </button>
                } :
            </div>

        ))}
      </div>
    </div>
  );
};

export default SuperRare;

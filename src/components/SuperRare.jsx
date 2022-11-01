import React, {useState} from "react";
import { superRareData } from "../data";
import Card from "./Card";
import {BigNumber, ethers} from "ethers";
import theClubMembership from '../assets/TheClubMembership.json';


 const mintMembershipCart = (plan) => {
     console.log("Minting " + plan );
}
const TheClubMembershipAddress = "0x9FFAa549Cde064E4e75fE52a609264B8C8600C63";

const handleMint = async () => {
    if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider( window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            TheClubMembershipAddress,
            theClubMembership.abi,
            signer
        )
        try{
            console.log(provider.getBalance(TheClubMembershipAddress));
            const response = await contract.mint(
                BigNumber.from(1), {
                    value: ethers.utils.parseEther((0.00002 * 1 ).toString())
                }
            );
            console.log('response ' , response );
        } catch (err) {
            console.log("error: ", err);
        }
    }
}



const SuperRare = ( {accounts , setAccounts , isConnected }) => {

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
            <div className="cardButton" >


            <Card
            image={item.image}
            series={item.series}
            title={item.title}
            price={item.price}
            tag={item.tag}
            time={item.time}
            key={index}
          />
                <br/>
                <br/>
               { isConnected ?
                   <button className="button" onClick={() => handleMint()} >Mint {item.title} </button>
                   : <button className="button" onClick={() => handleMint()} >Mint {item.title} </button>
                }
            </div>

        ))}
      </div>
    </div>
  );
};

export default SuperRare;

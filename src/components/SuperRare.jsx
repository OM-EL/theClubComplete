import React from "react";
import { superRareData } from "../data";
import Card from "./Card";
import {BigNumber, ethers} from "ethers";
import theClubMembership from '../assets/TheClubMembership.json';
import Advantages from "./Advantages";

const TheClubMembershipAddress = "0x7f22d25dC66756D5Eeedc2695EB42F58203e7cA5";

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
            const rt = await contract.mint(
                BigNumber.from(1), {
                    value: ethers.utils.parseEther((0.00002 * 1 ).toString())
                }
            );
            console.log(rt);
        } catch (err) {
            console.log("error: ", err);
        }
    }
}



const SuperRare = ( {accounts , setAccounts , isConnected }) => {

  return (
    <div className="super-rare" >
      <div className="title-container">
        <h2 className="title">NFT Types</h2>
        <p className="description">
          We have released three limited edition NFT's
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
            key={index}
          />
                <br/>
                <div className="advs" >
                    <Advantages  className="col" title={item.title} />
                </div>
                <br/>
                    { isConnected ?
                        <button className="button" onClick={() => handleMint()} >Mint {item.title} </button>
                        : <button className="button" onClick={() => handleMint()} >Mint {item.title} </button>
                    }

                    <br/>



            </div>

        ))}
      </div>
    </div>
  );
};

export default SuperRare;

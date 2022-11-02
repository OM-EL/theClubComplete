import React, {useEffect, useState} from "react";
import Card from "./Card";
import {Alchemy, Network} from "alchemy-sdk";
import  "../scss/sections/_nftList.scss"
import closeD from "../assets/closeD.png"
import openD from "../assets/openD.png"
const config = {
    apiKey: "kwfqNgqlwbwESMhd0GTlt3sXvi6O3SIu",
    network: Network.MATIC_MUMBAI,
};
let canEnter = false;


const alchemy = new Alchemy(config);


function Benefits({accounts , setAccounts , isConnected }) {
    let [isVerificationFinished, setisVerificationFinished] = React.useState(false);
    const hasTheClubNFT = async () => {
        let canEnter = await alchemy.nft.getNftsForOwner(accounts[0]);
        canEnter = canEnter.totalCount > 0;
        console.log(canEnter);
        return canEnter ;
    };
    function renderCanOpen( ) {
        if(canEnter)
        {
            return <img src={openD} alt="super" />;
        }
        else
            return <img src={closeD} alt="super" />;
    }


    useEffect(() => {
        hasTheClubNFT().then((response) => {

            canEnter = response;
            setisVerificationFinished(true);

        });
    }, [isConnected , accounts])

    return (
        <div className="super-rare" id="super-rare">
            <div className="title-container">
            </div>
            {
                isVerificationFinished && isConnected ?

                    <div className="cards">
                        { renderCanOpen ()}
                    </div>

                    :
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
            }
        </div>
    );
}

export default Benefits;
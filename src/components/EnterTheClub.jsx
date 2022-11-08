import React, {useEffect} from "react";
import {Alchemy, Network} from "alchemy-sdk";
import  "../scss/sections/_nftList.scss"
import closeD from "../assets/closeD.png"
import openD from "../assets/openD.png"
const config = {
    apiKey: "8sMz9VAouPOCaKqUXS_3Wck_AODUPbkD",
    network: Network.MATIC_MUMBAI,
};
let canEnter = false;


const alchemy = new Alchemy(config);


function EnterTheClub({accounts , setAccounts , isConnected }) {
    let [isVerificationFinished, setisVerificationFinished] = React.useState(false);
    const hasTheClubNFT = async () => {
        let canEnter = await alchemy.nft.getNftsForOwner(accounts[0]);
        canEnter = canEnter.totalCount > 0;
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
        <div className="super-rare" id="benefits">
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

export default EnterTheClub;

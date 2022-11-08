import React, {useEffect, useState} from "react";
import Card from "./Card";
import {Alchemy, Network} from "alchemy-sdk";
import  "../scss/sections/_nftList.scss"
import minting from "../assets/minting.png"
import anivDrink from "../assets/anivDrink.png"
import monthDrink from "../assets/monthDrink.png"
import table from "../assets/table.png"
import dj from "../assets/dj.png"

import AdvantageCard from "./AdvantageCard";

const config = {
    apiKey: "8sMz9VAouPOCaKqUXS_3Wck_AODUPbkD",
    network: Network.MATIC_MUMBAI,
};
let nfts = [];
const alchemy = new Alchemy(config);
let selectedNFTId = undefined;





function NftList({accounts , setAccounts , isConnected }) {

    let [isNFTLoaded, setIsNFTLoaded] = React.useState(false);
    const [modal, setModal] = useState(false);

    const getNFTList = async () => {
        let nfts = await alchemy.nft.getNftsForOwner(accounts[0] , {contractAddresses : ["0x7f22d25dC66756D5Eeedc2695EB42F58203e7cA5"]}  );
        console.log(nfts);
        return nfts;
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const openInNewTab = url => {
        if( url && url.gateway) {
            window.open(url, '_blank', url.gateway);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const selectNft = id => {
        if( id) {
            selectedNFTId = id.toString();
            toggleModal();
        }
    };

    useEffect(() => {
        getNFTList().then((response) => {

            nfts = response.ownedNfts;
            setIsNFTLoaded(true);

        });
    }, [isConnected , accounts])

    return (
        <div className="super-rare" id="nft-list">
            <div className="title-container">
                <h2 className="title">My NFTs</h2>
            </div>
            <div>{isNFTLoaded}</div>
            {
                isNFTLoaded && isConnected ?

                    <div className="cards">
                        {nfts.map((item, index) => (
                            <div className="cardButton" onClick={()=> selectNft(item.tokenId)}>
                                <Card
                                    image={ (item.media[0] && item.media[0].gateway ) ? item.media[0].gateway : minting}
                                    title={item.rawMetadata.description}
                                    key={item.rawMetadata.name}
                                    tag={item.tokenId}
                                />
                                <div>{item.media.gateway}</div>
                            </div>

                        ))}
                    </div>
                    :
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
            }

            { modal &&

                <div className="modal">
                    <div className="overlay" onClick={()=>toggleModal()} ></div>
                    <div className="modal-content">

                        <AdvantageCard image = {anivDrink} title = 'Anniversary drink '  />
                        <AdvantageCard image = {monthDrink} title = 'Month drink'  />
                        <AdvantageCard image = {table} title = '20% off Table'  />
                        <AdvantageCard image = {dj} title = 'Free Shot out'  />
                        <button className="close-modal" onClick={()=>toggleModal()}></button>
                    </div>
                </div>
            }
        </div>
    );
}

export default NftList;

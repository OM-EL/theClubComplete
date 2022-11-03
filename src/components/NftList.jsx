import React, {useEffect, useState} from "react";
import Card from "./Card";
import {Alchemy, Network} from "alchemy-sdk";
import  "../scss/sections/_nftList.scss"

const config = {
    apiKey: "kwfqNgqlwbwESMhd0GTlt3sXvi6O3SIu",
    network: Network.MATIC_MUMBAI,
};
let nfts = [];


const alchemy = new Alchemy(config);


function NftList({accounts , setAccounts , isConnected }) {
    let [isNFTLoaded, setIsNFTLoaded] = React.useState(false);
    const getNFTList = async () => {
        let nfts = await alchemy.nft.getNftsForOwner(accounts[0]);
        return nfts;
    };

    useEffect(() => {
        getNFTList().then((response) => {

            nfts = response.ownedNfts;
            setIsNFTLoaded(true);

        });
    }, [isConnected , accounts])

    return (
        <div className="super-rare" id="super-rare">
            <div className="title-container">
                <h2 className="title">My NFTs</h2>
            </div>
            <div>{isNFTLoaded}</div>
            {
                isNFTLoaded && isConnected ?

                    <div className="cards">
                        {nfts.map((item, index) => (
                            <div className="cardButton" >
                                <Card
                                    image={item.media[0].gateway}
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
        </div>
    );
}

export default NftList;

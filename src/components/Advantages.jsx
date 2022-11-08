import React from "react";
import superEth from "../assets/supereth.png";
import {advantagesList, superRareData} from "../data";


const advantagesOfPlan = (nftType) => {
    const nftTypeAdvantagesList = advantagesList.filter((element) => element.title === nftType)[0].data;

    return (
        <div>
            {
                nftTypeAdvantagesList.map( (adv) =>
                    <div>
                        <li>{adv}</li>
                        <br/>
                    </div>

                )
            }
        </div>

    )
}

const Advantages = ({ title }) => {
    return (
        <div>
            { advantagesOfPlan(title) }
        </div>
    );
};


export default Advantages;

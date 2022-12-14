import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';

import { useParams } from "react-router-dom";

// import Abis
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 
const fakeBaycAbi = require('./fakeBaycAbi.json')

const provider = new ethers.providers.Web3Provider(window.ethereum);

const fakeNefturiansAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address
const fakeBaycAddress = '0x1dA89342716B14602664626CD3482b47D5C2005E';


const fakeBaycContract = new ethers.Contract(fakeBaycAddress, fakeBaycAbi['abi'], provider);


// get URI link from contract
async function getTokenUriLink(tokenID){
    return await fakeBaycContract.tokenURI(tokenID);
}

// get json from URI
async function getJsonFromUri(uriUrl){
    //console.log("uriUrl",uriUrl);
    return (await fetch(uriUrl).then(res => res.json()));
}

// get total supply
async function totalSupply(){
    return await fakeBaycContract.totalSupply();
}

export default function FakeBaycTokenInfo(){
    const {tokenID} = useParams();
    // get token URI data
    const [uriData, setUriData] = useState(null);
    useEffect(() => {
        getTokenUriLink(tokenID).then((uriLink) => {
            //console.log("uriLink",uriLink);
            getJsonFromUri(uriLink).then((x)=>{
                //console.log("x",x);
                setUriData(x);
            })
        });
    }, []); //rien dans les [] car on veut que ça se lance qu'une seule fois


    // get contract name
    const [contractName, setContractName] = useState(null);
    
    useEffect(() => {
        fakeBaycContract.name().then(setContractName);
    }, [contractName]);

    //console.log("test recup json",JSON.parse(JSON.stringify(uriData))["attributes"][0]["value"]);

    if (tokenID.match(/^[0-9]+$/) != null && parseInt(tokenID) >= 0 && parseInt(tokenID) < 30 ) { // ne fonctionne pas
        if(!uriData){
            return(
                <div>
                    <h1>{contractName} number {tokenID.toString()} </h1>
                    <p>Loading image and data ...</p>
                    <div>
                        <p><strong>Description : </strong></p>
                        <p>Mouth: </p>
                        <p>Clothes: </p>
                        <p>Background: </p>
                        <p>Eye: </p>   
                        <p>Fur: </p>
                        
                    </div>
                </div>
            )
        } 
        else{          
            return(
                <div>
                    <h1>{contractName} number {tokenID.toString()} </h1>
                    <img src = {"https://gateway.pinata.cloud/ipfs/" + uriData?.image.split("/")[2]}></img>
                    <div>
                        <p><strong>Description : </strong></p>
                        <p>Mouth: {JSON.parse(JSON.stringify(uriData))["attributes"][0]["value"]}</p>
                        <p>Clothes: {JSON.parse(JSON.stringify(uriData))["attributes"][1]["value"]}</p>
                        <p>Background: {JSON.parse(JSON.stringify(uriData))["attributes"][2]["value"]}</p>
                        <p>Eyes: {JSON.parse(JSON.stringify(uriData))["attributes"][3]["value"]}</p>
                        <p>Fur: {JSON.parse(JSON.stringify(uriData))["attributes"][4]["value"]}</p>                            
                    </div>                 
                </div>
            )
         }
    }
    return (
        <div>
            <h1>Token ID {tokenID} not found. Try with another one !</h1>
        </div>
    )

    

}
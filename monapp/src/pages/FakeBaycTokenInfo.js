import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';

// import Abis
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 
const fakeBaycAbi = require('./fakeBaycAbi.json')

const provider = new ethers.providers.Web3Provider(window.ethereum);

const fakeNefturiansAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address
const fakeBaycAddress = '0x1dA89342716B14602664626CD3482b47D5C2005E'

const fakeNefturiansContract = new ethers.Contract(fakeNefturiansAddress, fakeNefturiansAbi['abi'], provider);

const fakeBaycContract = new ethers.Contract(fakeBaycAddress, fakeBaycAbi['abi'], provider);

// get URI
function getTokenUriLink(tokenID){
    return fakeNefturiansContract.tokenURI(tokenID);
}

// get json from URI
function getJsonFromUri(uriUrl){
    return fetch(uriUrl).then(response => response.json());
}



export default function FakeBaycTokenInfo(){
    //state token ID
    const [stateTokenID, setTokenID] = useState(null);


    // get contract name
    const [contractName, setContractName] = useState(null);
    useEffect(() => {
        fakeBaycContract.name().then(setContractName);
    }, [contractName]);

    // get token ID from url
   const tokenID ="erreur";



    if(!contractName) return(<div>Loading...</div>)
    return(
        <div>
            <h1>{contractName} number {tokenID.toString()} </h1>
        </div>
    )

}
import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';
import { useParams } from "react-router-dom"

//import fakeNefturiansAbi
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address

const fakeNefturiansContract = new ethers.Contract(contractAddress, fakeNefturiansAbi['abi'], provider);


function getTokenIds(address, balance) {
    // get the tokenIds
    const tokenIds = [];
    for(let i = 0; i < balance; i++){
        tokenIds.push(getTokenId(address, i));
    }
    return tokenIds;
}

// return the display of each token informations + image



//get token ID
async function getTokenId(address, index) {
    const tokenId = await fakeNefturiansContract.tokenOfOwnerByIndex(address, index);
    return tokenId;
}

// get uri link from contract
async function getUri(tokenId) {
    const uri = await fakeNefturiansContract.tokenURI(tokenId);
    return uri;
}

// get json from URI
async function getJsonFromUri(uriUrl){
    //console.log("uriUrl",uriUrl);
    return (await fetch(uriUrl).then(res => res.json()));
}

async function getName(tokenId) {
    // getUri
    const uri = await getUri(tokenId);
    // get json from uri
    const json = await getJsonFromUri(uri);
    console.log("json", json.name);
    return json.name.toString();
}

// display the tokens




export default function FakeNeftiriansInfos(){
    // get the address from the url
    const {address} = useParams();

    // get the number of tokens owned by the address
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        fakeNefturiansContract.balanceOf(address).then(setBalance);
    }, [balance]);
    //console.log("balance", balance );

    // get the tokenIds
    //const tokenIds = getTokenIds(address, parseInt(balance));
    // console.log("tokenIds", tokenIds);

    if(!balance) return(<div><p>Loading...</p></div>);    




    return(

        <div>
            <div>
                <h1>Fake Nefturians</h1>
                <p>Address: {address}</p>
                <p>Number of tokens: {balance.toString()}</p>
            </div>
            <div>
               <p>{getName(1)}</p>
            </div>
        </div>
    )

}
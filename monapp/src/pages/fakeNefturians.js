import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';

//import fakeNefturiansAbi
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address

const fakeNefturiansContract = new ethers.Contract(contractAddress, fakeNefturiansAbi['abi'], provider);






export default function FakeNefturiansActions() {
   
    // get minimum token price 
    const [minPrice, setMinPrice] = useState(null);
    useEffect(() => {
        fakeNefturiansContract.tokenPrice().then(setMinPrice);
    }, [minPrice]);

    if(!minPrice) return(<div>Loading...</div>)

    
    return (
        <div>
            <h1>Fake Nefturians</h1>
            <p>Minimum price: {(minPrice/1000000000000000000).toString()} ETH // The buying price have to be greater</p>
            <text type="number" id="price" placeholder="Price"></text>
            <button onClick={buyFakeNefturians(price)}>Buy Fake Nefturians for</button>
        </div>

    )

}
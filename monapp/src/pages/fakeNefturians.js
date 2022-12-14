import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import fakeNefturiansAbi
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address

const fakeNefturiansContract = new ethers.Contract(contractAddress, fakeNefturiansAbi['abi'], provider);

function buyFakeNefturians() {
    // interact with buyAToken function and send 0.105 ETH to the contract
    const signer = provider.getSigner();
    const fakeNefturiansContractWithSigner = fakeNefturiansContract.connect(signer);
    fakeNefturiansContractWithSigner.buyAToken({value: ethers.utils.parseEther("0.105")});    
}

function GetAddress() {
    
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const HandleClick = () => {
  
        const address = document.getElementById('input-field').value;     // Get the value of the input field
        // check if the field is empty
        if (address === '') {
            alert('Please enter an address');
            return;
        }
        const url =  address.toString();        
        navigate(url);        
    };
  
    return (
      <div>
        <p>Enter an ethereum address to see its fake Nefturians and their attributes</p>
        <input id="input-field" type="text" />
        <button onClick={HandleClick}>See the NFTs</button>
        
      </div>
    );
  }


export default function FakeNefturiansActions() {
   
    // get minimum token price 
    const [minPrice, setMinPrice] = useState(null);
    useEffect(() => {
        fakeNefturiansContract.tokenPrice().then(setMinPrice);
    }, [minPrice]);
    const priceMini = minPrice/1000000000000000000;
    if(!minPrice) return(<div>Loading...</div>)

    return (
        <div>
            <h1>Fake Nefturians</h1>
            <p>Minimum price: {priceMini.toString()} ETH /// The buying price have to be greater</p>
            <button onClick={buyFakeNefturians}>Buy Fake Nefturians for 0.105 ETH </button>
            <GetAddress />
        </div>
    )

}
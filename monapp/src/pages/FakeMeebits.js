import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';


const fakeMeebitsClaimerAbi = require('./fakeMeebitsClaimerAbi.json') 
const fakeMeebitsAbi = require('./fakeMeebitsAbi.json')

const sigMeebits = require('./sig_meebits.json')

// initialize the contract address
const fakeMeebitsAddress = '0xD1d148Be044AEB4948B48A03BeA2874871a26003';
const fakeMeebitsClaimerAddress = '0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const fakeMeebitsContract = new ethers.Contract(fakeMeebitsAddress, fakeMeebitsAbi['abi'], provider);
const fakeMeebitsClaimerContract = new ethers.Contract(fakeMeebitsClaimerAddress, fakeMeebitsClaimerAbi['abi'], provider);

async function claimedTokens(tokenId){
    return await fakeMeebitsClaimerContract.tokensThatWereClaimed(tokenId);
}

function GetId() {

  const [value, setValue] = useState('');

  const handleClick = () => {

    const tokenId = document.getElementById('input-field').value;     // Get the value of the input field

    // check if the value is a number
    if (isNaN(tokenId)) {
      alert('Please enter a number');
      return;
    }
    
    // check if the token id is valid
    if (tokenId < 0 || tokenId > 19999) {
        alert('Please enter a valid token id');
        return;
    }

    // check if the token id is already minted
    if(claimedTokens(tokenId) == true){
        alert('Token already minted. Try another one');
        return;
    }
    // claim the token
    try{
      const signer = provider.getSigner();
      const fakeMeebitsClaimerContractWithSigner = fakeMeebitsClaimerContract.connect(signer);
      fakeMeebitsClaimerContractWithSigner.claimAToken(tokenId, sigMeebits[tokenId]["signature"].toString());
    }catch(err){
      console.log(err);
      if(err.code === 4001){
        alert("You need to connect your wallet to claim a Fake Meebits NFT")
      }
    }
    //console.log(sigMeebits[tokenId]["signature"])
  };

  return (
    <div>
      <p>Chosse the token ID you want between 0 and 19,999</p>
      <input id="input-field" type="text" />
      <button onClick={handleClick}>Get NFT</button>
    </div>
  );
}


export default function FakeMeebitsActions(){
    
    return (
        <div>
          <h1>Fake Meebits</h1>
          <GetId />
        </div>
    )
}

import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import fakeBaycAbi 
const fakeBaycAbi = require('./fakeBaycAbi.json')

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x1dA89342716B14602664626CD3482b47D5C2005E'; // contract address

const fakeBaycContract = new ethers.Contract(contractAddress, fakeBaycAbi['abi'], provider);

function claimFakeBayc() {
    try{
        const signer = provider.getSigner();
        const fakeBaycContractWithSigner = fakeBaycContract.connect(signer);
        fakeBaycContractWithSigner.claimAToken();
    }catch(err){
        console.log(err);
        if(err.code === 4001){
            alert("You need to connect your wallet to claim a Fake BAYC")
        }
    }
}

function buttonClaimFakeBayc() {
    return(
        <button onClick={claimFakeBayc}>Claim Fake BAYC for free !!</button>
    )
}

// display token infos

function GetId() {
    
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const HandleClick = () => {
  
        const tokenId = document.getElementById('input-field').value;     // Get the value of the input field
        // check if the value is a number
        if (isNaN(tokenId)) {
            alert('Please enter a number');
            return;
        }
        // check if the token id is valid
        if (tokenId < 0) {
            alert('Please enter a valid token id');
            return;
        }
        const url =  tokenId.toString();        
        navigate(url);        
    };
  
    return (
      <div>
        <p>Enter a token id to display the nft and its attributes</p>
        <input id="input-field" type="text" />
        <button onClick={HandleClick}>Display NFT</button>
        
      </div>
    );
  }


export default function FakeBaycActions() {

    // get account address
    const signer = provider.getSigner();
    const [address, setAddress] = useState(null);
    useEffect(() => {
        signer.getAddress().then(setAddress);
    }, [signer]);

    // get contract name
    const [contractName, setContractName] = useState(null);
    useEffect(() => {
        fakeBaycContract.name().then(setContractName);
    }, [contractName]);

    // get token symbol
    const [symbol, setSymbol] = useState(null);
    useEffect(() => {
        fakeBaycContract.symbol().then(setSymbol);
    }, [symbol]);

    // get total token number
    const [totalTokenNumber, setTotalTokenNumber] = useState(null);
    useEffect(() => {
        fakeBaycContract.totalSupply().then(setTotalTokenNumber);
    }, [totalTokenNumber]);

    // get how many tokens are own by the signer 
    const [tokensOwned, setTokensOwned] = useState(null);
    useEffect(() => {
        fakeBaycContract.balanceOf(address).then(setTokensOwned);
    }, [tokensOwned]);

    if(!contractName || !totalTokenNumber ) return(<div>Loading...</div>)
    else{
        if(!tokensOwned){
            return(
                <div>
                    <div>
                    <h2>Fake BAYC</h2> 
                    <p>Contract Name: {contractName}</p>
                    <p>Total token number : {totalTokenNumber.toString()} {symbol}</p>
                    <p>Tokens owned by {address}: 0 {symbol}</p>
                    </div>
                    <div>{buttonClaimFakeBayc()}</div>
                    <GetId />
                </div>
            )
        }
        else{
            return(
                <div>
                    <div>
                    <h2>Fake BAYC</h2> 
                    <p>Contract Name: {contractName}</p>
                    <p>Total token number : {totalTokenNumber.toString()}</p>
                    <p>Tokens owned by {address}: {tokensOwned.toString()}</p>
                    </div>
                    <div>{buttonClaimFakeBayc()}</div>
                    
                    <GetId />
                    
                </div>
            )
        }
        
    }
}

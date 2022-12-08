import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';
//import fakeBaycAbi 
const fakeBaycAbi = require('./fakeBaycAbi.json')

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x1dA89342716B14602664626CD3482b47D5C2005E'; // contract address

const fakeBaycContract = new ethers.Contract(contractAddress, fakeBaycAbi['abi'], provider);

function claimFakeBayc() {
    const signer = provider.getSigner();
    const fakeBaycContractWithSigner = fakeBaycContract.connect(signer);
    fakeBaycContractWithSigner.claimAToken();
}

function buttonClaimFakeBayc() {
    return(
        <button onClick={claimFakeBayc}>Claim Fake BAYC for free !!</button>
    )
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
                </div>
            )
        }
        
    }
}

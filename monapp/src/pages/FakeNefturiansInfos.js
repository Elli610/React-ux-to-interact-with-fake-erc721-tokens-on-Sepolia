import { ethers } from "ethers";
import React, {  useEffect,  useState } from 'react';
import { useParams } from "react-router-dom"

//import fakeNefturiansAbi
const fakeNefturiansAbi = require('./fakeNefturiansAbi.json') 

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractAddress = '0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED'; // contract address

const fakeNefturiansContract = new ethers.Contract(contractAddress, fakeNefturiansAbi['abi'], provider);


// get balance of address
async function getBalance(address) {
    const balance = await fakeNefturiansContract.balanceOf(address);
    return balance;
}

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

// display the tokens
    
 
  


class TokenInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: 0,
        name: '',
        imageUrl: '',
        attributes: '',
    };
  }

  async componentDidMount(id, name, imageUrl, attributes) {
    // Fetch the NFT with the given ID from the blockchain or database
    this.setState({
        id: id,
        name: name,
        imageUrl: imageUrl,
        attributes: attributes,
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.imageUrl} alt={this.state.name} />
        <p>Name: {this.state.name}</p>
        <p>Attributes: {this.state.attributes.join(', ')}</p>
      </div>
    );
  }
}


 
  






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
    const tokenIds = getTokenIds(address, parseInt(balance));
    // console.log("tokenIds", tokenIds);

    if(!tokenIds || !balance) return(<div><p>Loading...</p></div>);    

    const TokenInfos = tokenIds.map(async (tokenId) => {

        const uri = await getUri(tokenId);
        //console.log("uri", uri);
        const json = await getJsonFromUri(uri);
        console.log("json", json.name);
        return (
            <div>
                <p>id = {tokenId.toString()}</p>
                <p>name = {json.name.toString()}</p>
            </div>
        );
    });


    return(

        <div>
            <div>
                <h1>Fake Nefturians</h1>
                <p>Address: {address}</p>
                <p>Number of tokens: {balance.toString()}</p>
            </div>
            <div>
               <TokenInfos />
            </div>
        </div>
    )

}
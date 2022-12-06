import { ethers } from "ethers";
import React, { useCallback, useEffect, useRef, useState } from 'react';
//[balance, setBalance] = useState(null);

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

export default function ChainInfo() {
    const [balance, setBalance] = useState(0);
    // Using React ref here to prevent component re-rendering when changing
    // previous balance value
    const prevBalanceRef = useRef(0);
  
    const fetchBalance = useCallback(async () => {
      const address = await signer.getAddress();
      //console.log(address);
  
      const rawBalance = await provider.getBalance(address);
      // Format ETH balance and parse it to JS number
      const value = parseFloat(ethers.utils.formatEther(rawBalance));
  
      // Optimization: check that user balance has actually changed before
      // updating state and triggering the consuming component re-render
      if (value !== prevBalanceRef.current) {
        prevBalanceRef.current = value;
        setBalance(value);
      }
    }, []);
  
    useEffect(() => {
      fetchBalance();
    }, [fetchBalance]);
  
    useEffect(() => {
      // Fetch user balance on each block
      provider.on('block', fetchBalance);
  
      // Cleanup function is used to unsubscribe from 'block' event and prevent
      // a possible memory leak in your application.
      return () => {
        provider.off('block', fetchBalance);
      };
    }, [fetchBalance]);
  
    // get account address
    const [address, setAddress] = useState(null);
    useEffect(() => {
        signer.getAddress().then(setAddress);
    }, [signer]);

    // get network
    const [network, setNetwork] = useState(null);
    useEffect(() => {
        provider.getNetwork().then(setNetwork);
    }, [network]);

    // get last block number
    const [blockNumber, setBlockNumber] = useState(null);
    useEffect(() => {
        provider.getBlockNumber().then(setBlockNumber);
    }, [blockNumber]);

    try{

    // check if current network is sepolia
    if (network.name === "sepolia") {

    return (
        <div>
          <p>Account: {address}</p>
          <p>Network: {network['name']} id = {network['chainId']}</p>
          <p>Balance: {balance} ETH</p>
          <p>Last block number: {blockNumber}</p>
        </div>
    );
    } else {
      return( 
        <div>
          <p>Please connect to the Sepolia network and refresh.</p>
          </div>
      )
    }
    } catch (e) {
      console.log(e)
        return (
          <div>
            <p>An error occured</p>
          </div>          
      )
    } 
  }



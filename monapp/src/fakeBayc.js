import { ethers } from "ethers";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fakeBaycAbi } from "./abi";
//[balance, setBalance] = useState(null);

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const abi = fakeBaycAbi;


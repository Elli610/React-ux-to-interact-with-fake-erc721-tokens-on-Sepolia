import {  Link } from "react-router-dom";

export default function Intro(){
    return(
        <div>
            <div>
            <h1>Welcome to my Website !</h1>
            <p>Here you can find some information about the Sepolia testnet and some fake ERC721 tokens on Sepolia.</p>
            <p>Feel free to explore the website and to contact me if you have any questions or if you find any bug. </p>
            <p>Here is the <a href="https://github.com/Elli610/React-ux-to-interact-with-fake-erc721-tokens-on-Sepolia">GitHub repository</a> of the website.</p>
            </div>
            <div>
                <h2>What is Sepolia ?</h2>
                <p>Sepolia is a testnet for Ethereum. It is a fork of the Ethereum mainnet. It is a great way to test smart contracts and dApps without spending real money.</p>
                <p>Here is the <a href="https://docs.sepolia.com/">documentation</a> of Sepolia</p>

                <h2>what can you do on this website ?</h2>
                <p>-  In the <Link to="/chain-info">Chain Info</Link> section, you can find some information about your wallet and some informations about the Sepolia network</p>
                <p>-  In the <Link to="/fakeBayc">Fake BAYC</Link> section, you can see the total supply of tokens and how many tokens you own. You can also claim a fake BAYC for free (you only pay transaction fees).</p>
                <p>You can use the research bar to see some informations about a specific token id. </p>
                <p>-  In the <Link to="/fakeNefturians">Fake Nefturians</Link> section, you can buy a fake Nefturian nft for 0.105ETH (+ transaction fees).</p>
                <p>You can use the research bar to display all the fake Nefturians owned by a specific address.</p>
                <p>-  In the <Link to="/fakeMeebits">Fake Meebits</Link> section, you can claim a specific fake Meebit using its id (you have to choose an id that hasn't been claimed yet).</p>
            </div>
        </div>
    )
}
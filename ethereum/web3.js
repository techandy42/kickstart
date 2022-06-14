import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running.
  // allow metamask account to be used
  window.ethereum.request({ method: 'eth_requestAccounts' })
  // change web3 to current provider (newer version of metamask)
  web3 = new Web3(window.ethereum)
} else {
  // We are on the server *OR* the user is not running metamask
  // own provider that connects to rinkeby testnet through infura
  // same infura url as deploy.js
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c',
  )
  web3 = new Web3(provider)
}

export default web3

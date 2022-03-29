# IoTeX dApp Sample V2

<a href="https://iotex.io/devdiscord" target="_blank">
  <img src="https://github.com/iotexproject/halogrants/blob/880eea4af074b082a75608c7376bd7a8eaa1ac21/img/btn-discord.svg" height="36px">
</a>

![7121622212283_ pic](https://user-images.githubusercontent.com/448293/120024975-d2604b80-bfa4-11eb-969c-f6f581fe11bf.jpg)

This is a boilerplate template for making your awesome dApp on IoTeX and ETH, BSC, and other possible chains ([request here](https://github.com/iotexproject/iotex-dapp-sample-v2/issues/new))

Technology used in this template are

- [Next](https://github.com/vercel/next.js)
- [React](https://reactjs.org/)
- [TRPC](https://trpc.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Mobx](https://mobx.js.org/README.html)
- [Chakra](https://chakra-ui.com/)
- [Cypress](https://www.cypress.io/)

## Intro

A starter for React with Typescript with the fast Vite and the beautiful Chakra, tested with the powerful Cypress.

## Cheat Sheet

Here's a cheat sheet list to help you get started quickly

```ts
import { rootStore, useStore } from '@/store/index';

const {god} = useStore()
// or const god = rootStore.god

god.isConnect

god.currentChain
god.currentChain.chainId  // for current connected chain id
god.currentChain.Coin  // eth/bnb/iotx
god.currentChain.Coin.balance  // current balance
// ... see ChainState

god.currentNetwork
god.currentNetwork.account   // for current connected account address
// ... see NetworkState


god.setShowConnecter()  // to show/close the Wallet Selector

god.currentNetwork.loadBalance() // to load chain coin balance
god.currentNetwork.multicall()  // main function to batch read state from contract
god.currentNetwork.execContract() // main function to execute contract




// multicall/execContract example
import ERC20ABI from "..."

const newToken = {
    address: "0x810ee35443639348adbbc467b33310d2ab43c168",
    abi: ERC20ABI,
    symbol: "",
    name: "",
    decimals: "",
    balance: new BignumberState({}),
}

const {address, abi} = newToken

await god.currentNetwork.multicall([
    { address, abi, method: 'symbol', handler: (v: any) => (newToken.symbol = v.toString()) },
    { address, abi, method: 'name', handler: (v: any) => (newToken.name = v.toString()) },
    { address, abi, method: 'decimals', handler: (v: any) => (newToken.decimals = Number(v.toString())) },
    { address, abi, method: 'balanceOf', params:[god.currentNetwork.account]  handler: newToken.balance},
);

await god.currenNetwork.execContract({adderss,abi,method:"transfer", params:["0x", "100000000000000000"]})
await god.currenNetwork.execContract({adderss,abi,method:"approve", params:["0x", "100000000000000000"]})



// to help share the bignumber between on function and UI
import BN from 'bignumber.js';
import { BigNumberState } from '@/store/standard/BigNumberState';

const tokenAmount = new BigNumberState({value: new BN(1000000000000000000), decimals: 18 })
console.log(tokenAmount.value.toFixed(0), tokenAmount.format)
// 1000000000000000000, 1
tokenAmount.setValue(new BN(2000000000000000000))
// 2000000000000000000, 2


```

## Installation

Clone the repo and run `yarn install`

## Start

After the successfull installation of the packages: `yarn start`

## Tests

You can build tests with Cypress. I wrote a small test to see if it's enabled. You can run it with `yarn test`

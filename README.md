# IoTeX dApp Sample V2

This is a boilerplate template for making your awesome dApp on IoTeX and ETH, BSC, and other possible chains ([request here](https://github.com/iotexproject/iotex-dapp-sample-v2/issues/new))


Technology used in this template are

- [Vite](https://github.com/vitejs/vite)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Chakra](https://chakra-ui.com/)
- [Cypress](https://www.cypress.io/)

## Intro

A starter for React with Typescript with the fast Vite and the beautiful Chakra, tested with the powerful Cypress.

## Features

### Aliases

This starter has configurations that enables aliases out of the box. Any folder inside `src` is automatically setup as an alias. It now has the following structure:

```
src
    pages
    resources
```

that generates the follow:

```
{
    '@pages': '${project_path}/src/pages'
    '@resources': '${project_path}/src/resources'
}
```

## Installation

Clone the repo and run `yarn install`

## Start

After the successfull installation of the packages: `yarn start`

## Tests

You can build tests with Cypress. I wrote a small test to see if it's enabled. You can run it with `yarn test`

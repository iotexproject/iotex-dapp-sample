export const metamaskUtils = {
  registerToken: async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage: string) => {
    //@ts-ignore

    const tokenAdded = await window.ethereum.request({
      //@ts-ignore
      method: 'wallet_watchAsset',
      params: {
        //@ts-ignore
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage
        }
      }
    });

    return tokenAdded;
  },
  setupNetwork: async ({
    chainId,
    chainName,
    rpcUrls,
    blockExplorerUrls,
    nativeCurrency
  }: {
    chainId: number;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  }) => {
    return new Promise(async (resolve, reject) => {
      //@ts-ignore
      const provider = window.ethereum;
      if (provider) {
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }]
          });
          resolve(true);
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: `0x${chainId.toString(16)}`,
                    chainName,
                    nativeCurrency,
                    rpcUrls,
                    blockExplorerUrls
                  }
                ]
              });
              resolve(true);
              return true;
            } catch (error) {
              reject(error);
              return false;
            }
          } else {
            reject(switchError);
          }
        }
      } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
        reject(false);
        return false;
      }
    });
  }
};

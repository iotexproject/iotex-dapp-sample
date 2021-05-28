export const metamaskUtils = {
  registerToken: async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage: string) => {
    //@ts-ignore

    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
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
    //@ts-ignore
    const provider = window.ethereum;
    if (provider) {
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
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
      return false;
    }
  }
};

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export class Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export class IQuery {
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  ETH?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  Kovan?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  BSC?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  Polygon?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  IoTeX?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  IoTeX_Testnet?: Maybe<IMulticall>;
  /** @deprecated This API is deprecated. Please use 'crosschain multicall' instead. */
  Polis?: Maybe<IMulticall>;
  UniswapFactory?: Maybe<Array<Maybe<IUniswapFactory>>>;
  UniswapRouter?: Maybe<Array<Maybe<IUniswapRouter>>>;
  LPToken?: Maybe<Array<Maybe<ILpToken>>>;
  WETH?: Maybe<Array<Maybe<IWeth>>>;
  ERC20?: Maybe<Array<Maybe<IErc20>>>;
  ERC721?: Maybe<Array<Maybe<IErc721>>>;
  networks?: Maybe<Array<Maybe<INetwork>>>;
  swap?: Maybe<IAmount>;
};


export class IQueryEthArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryKovanArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryBscArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryPolygonArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryIoTeXArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryIoTeX_TestnetArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryPolisArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryUniswapFactoryArgs {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQueryUniswapRouterArgs {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQueryLpTokenArgs {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQueryWethArgs {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQueryErc20Args {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQueryErc721Args {
  calls?: InputMaybe<Array<InputMaybe<ICrossChainCalls>>>;
};


export class IQuerySwapArgs {
  args?: InputMaybe<ISwapArgsType>;
};

export class IUniswapFactory {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  INIT_CODE_PAIR_HASH?: Maybe<Scalars['String']>;
  allPairs?: Maybe<Scalars['String']>;
  allPairsLength?: Maybe<Scalars['String']>;
  createPair?: Maybe<Scalars['String']>;
  feeTo?: Maybe<Scalars['String']>;
  feeToSetter?: Maybe<Scalars['String']>;
  getPair?: Maybe<Scalars['String']>;
  setFeeTo?: Maybe<Scalars['String']>;
  setFeeToSetter?: Maybe<Scalars['String']>;
  getPairs?: Maybe<Array<Maybe<ILpToken>>>;
};


export class IUniswapFactoryInit_Code_Pair_HashArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapFactoryAllPairsArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactoryAllPairsLengthArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapFactoryCreatePairArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  tokenA?: InputMaybe<Scalars['String']>;
  tokenB?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactoryFeeToArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapFactoryFeeToSetterArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapFactoryGetPairArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactorySetFeeToArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  _feeTo?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactorySetFeeToSetterArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  _feeToSetter?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactoryGetPairsArgs {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  addresses?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  preload?: InputMaybe<Scalars['Boolean']>;
  token0Address?: InputMaybe<Scalars['String']>;
  token1Address?: InputMaybe<Scalars['String']>;
  cache?: InputMaybe<ICacheInputType>;
};

export class IUniswapRouter {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  WETH?: Maybe<Scalars['String']>;
  addLiquidity?: Maybe<Scalars['String']>;
  addLiquidityETH?: Maybe<Scalars['String']>;
  factory?: Maybe<Scalars['String']>;
  getAmountIn?: Maybe<Scalars['String']>;
  getAmountOut?: Maybe<Scalars['String']>;
  getAmountsIn?: Maybe<Scalars['String']>;
  getAmountsOut?: Maybe<Scalars['String']>;
  quote?: Maybe<Scalars['String']>;
  removeLiquidity?: Maybe<Scalars['String']>;
  removeLiquidityETH?: Maybe<Scalars['String']>;
  removeLiquidityETHSupportingFeeOnTransferTokens?: Maybe<Scalars['String']>;
  swapETHForExactTokens?: Maybe<Scalars['String']>;
  swapExactETHForTokens?: Maybe<Scalars['String']>;
  swapExactETHForTokensSupportingFeeOnTransferTokens?: Maybe<Scalars['String']>;
  swapExactTokensForETH?: Maybe<Scalars['String']>;
  swapExactTokensForETHSupportingFeeOnTransferTokens?: Maybe<Scalars['String']>;
  swapExactTokensForTokens?: Maybe<Scalars['String']>;
  swapExactTokensForTokensSupportingFeeOnTransferTokens?: Maybe<Scalars['String']>;
  swapTokensForExactETH?: Maybe<Scalars['String']>;
  swapTokensForExactTokens?: Maybe<Scalars['String']>;
  swap?: Maybe<IAmount>;
  preload?: Maybe<Scalars['Boolean']>;
};


export class IUniswapRouterWethArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapRouterAddLiquidityArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  tokenA?: InputMaybe<Scalars['String']>;
  tokenB?: InputMaybe<Scalars['String']>;
  amountADesired?: InputMaybe<Scalars['String']>;
  amountBDesired?: InputMaybe<Scalars['String']>;
  amountAMin?: InputMaybe<Scalars['String']>;
  amountBMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterAddLiquidityEthArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  amountTokenDesired?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterFactoryArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IUniswapRouterGetAmountInArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOut?: InputMaybe<Scalars['String']>;
  reserveIn?: InputMaybe<Scalars['String']>;
  reserveOut?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountOutArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountIn?: InputMaybe<Scalars['String']>;
  reserveIn?: InputMaybe<Scalars['String']>;
  reserveOut?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountsInArgs {
  cache?: InputMaybe<ICacheInputType>;
  amountOut?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IUniswapRouterGetAmountsOutArgs {
  cache?: InputMaybe<ICacheInputType>;
  amountIn?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IUniswapRouterQuoteArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountA?: InputMaybe<Scalars['String']>;
  reserveA?: InputMaybe<Scalars['String']>;
  reserveB?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  tokenA?: InputMaybe<Scalars['String']>;
  tokenB?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountAMin?: InputMaybe<Scalars['String']>;
  amountBMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityEthArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityEthSupportingFeeOnTransferTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapEthForExactTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOut?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactEthForTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactEthForTokensSupportingFeeOnTransferTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForEthArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForEthSupportingFeeOnTransferTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForTokensSupportingFeeOnTransferTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapTokensForExactEthArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOut?: InputMaybe<Scalars['String']>;
  amountInMax?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapTokensForExactTokensArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amountOut?: InputMaybe<Scalars['String']>;
  amountInMax?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapArgs {
  args?: InputMaybe<ISwapArgsType>;
};


export class IUniswapRouterPreloadArgs {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export class ILpToken {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  MINIMUM_LIQUIDITY?: Maybe<Scalars['String']>;
  allowance?: Maybe<Scalars['String']>;
  approve?: Maybe<Scalars['String']>;
  balanceOf?: Maybe<Scalars['String']>;
  burn?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['String']>;
  factory?: Maybe<Scalars['String']>;
  getReserves?: Maybe<Scalars['String']>;
  initialize?: Maybe<Scalars['String']>;
  kLast?: Maybe<Scalars['String']>;
  mint?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price0CumulativeLast?: Maybe<Scalars['String']>;
  price1CumulativeLast?: Maybe<Scalars['String']>;
  skim?: Maybe<Scalars['String']>;
  swap?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  sync?: Maybe<Scalars['String']>;
  token0?: Maybe<Scalars['String']>;
  token1?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['String']>;
  transfer?: Maybe<Scalars['String']>;
  transferFrom?: Maybe<Scalars['String']>;
  Token0?: Maybe<IErc20>;
  Token1?: Maybe<IErc20>;
  priceUSD?: Maybe<Scalars['String']>;
  totalLiquidityUSD?: Maybe<Scalars['String']>;
};


export class ILpTokenMinimum_LiquidityArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenAllowanceArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class ILpTokenApproveArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class ILpTokenBalanceOfArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
};


export class ILpTokenBurnArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenDecimalsArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenFactoryArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenGetReservesArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenInitializeArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  _token0?: InputMaybe<Scalars['String']>;
  _token1?: InputMaybe<Scalars['String']>;
};


export class ILpTokenKLastArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenMintArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenNameArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenPrice0CumulativeLastArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenPrice1CumulativeLastArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenSkimArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenSwapArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amount0Out?: InputMaybe<Scalars['String']>;
  amount1Out?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class ILpTokenSymbolArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenSyncArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
};


export class ILpTokenToken0Args {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenToken1Args {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenTotalSupplyArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class ILpTokenTransferArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class ILpTokenTransferFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export class IWeth {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  CALLBACK_SUCCESS?: Maybe<Scalars['String']>;
  PERMIT_TYPEHASH?: Maybe<Scalars['String']>;
  allowance?: Maybe<Scalars['String']>;
  approve?: Maybe<Scalars['String']>;
  approveAndCall?: Maybe<Scalars['String']>;
  balanceOf?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['String']>;
  deposit?: Maybe<Scalars['String']>;
  depositTo?: Maybe<Scalars['String']>;
  depositToAndCall?: Maybe<Scalars['String']>;
  flashFee?: Maybe<Scalars['String']>;
  flashLoan?: Maybe<Scalars['String']>;
  flashMinted?: Maybe<Scalars['String']>;
  maxFlashLoan?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nonces?: Maybe<Scalars['String']>;
  permit?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['String']>;
  transfer?: Maybe<Scalars['String']>;
  transferAndCall?: Maybe<Scalars['String']>;
  transferFrom?: Maybe<Scalars['String']>;
  withdraw?: Maybe<Scalars['String']>;
  withdrawFrom?: Maybe<Scalars['String']>;
  withdrawTo?: Maybe<Scalars['String']>;
};


export class IWethCallback_SuccessArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethPermit_TypehashArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethAllowanceArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IWethApproveArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethApproveAndCallArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethBalanceOfArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
};


export class IWethDecimalsArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethDepositArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
};


export class IWethDepositToArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
};


export class IWethDepositToAndCallArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethFlashFeeArgs {
  cache?: InputMaybe<ICacheInputType>;
  token?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IWethFlashLoanArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  receiver?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethFlashMintedArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethMaxFlashLoanArgs {
  cache?: InputMaybe<ICacheInputType>;
  token?: InputMaybe<Scalars['String']>;
};


export class IWethNameArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethNoncesArgs {
  cache?: InputMaybe<ICacheInputType>;
  args0?: InputMaybe<Scalars['String']>;
};


export class IWethPermitArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  owner?: InputMaybe<Scalars['String']>;
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  v?: InputMaybe<Scalars['String']>;
  r?: InputMaybe<Scalars['String']>;
  s?: InputMaybe<Scalars['String']>;
};


export class IWethSymbolArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethTotalSupplyArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IWethTransferArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethTransferAndCallArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethTransferFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawToArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export class IErc20 {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  allowance?: Maybe<Scalars['String']>;
  approve?: Maybe<Scalars['String']>;
  balanceOf?: Maybe<Scalars['String']>;
  burn?: Maybe<Scalars['String']>;
  burnFrom?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['String']>;
  decreaseAllowance?: Maybe<Scalars['String']>;
  increaseAllowance?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['String']>;
  transfer?: Maybe<Scalars['String']>;
  transferFrom?: Maybe<Scalars['String']>;
  checkApproval?: Maybe<IApprovalReturnType>;
  any?: Maybe<Scalars['String']>;
};


export class IErc20AllowanceArgs {
  cache?: InputMaybe<ICacheInputType>;
  owner?: InputMaybe<Scalars['String']>;
  spender?: InputMaybe<Scalars['String']>;
};


export class IErc20ApproveArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20BalanceOfArgs {
  cache?: InputMaybe<ICacheInputType>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc20BurnArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20BurnFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  account?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20DecimalsArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc20DecreaseAllowanceArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  subtractedValue?: InputMaybe<Scalars['String']>;
};


export class IErc20IncreaseAllowanceArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  spender?: InputMaybe<Scalars['String']>;
  addedValue?: InputMaybe<Scalars['String']>;
};


export class IErc20NameArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc20SymbolArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc20TotalSupplyArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc20TransferArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  recipient?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20TransferFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  sender?: InputMaybe<Scalars['String']>;
  recipient?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20CheckApprovalArgs {
  user: Scalars['String'];
  spender: Scalars['String'];
  amount: Scalars['String'];
  withData?: InputMaybe<Scalars['Boolean']>;
};


export class IErc20AnyArgs {
  field?: InputMaybe<IAnyDataField>;
  params?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export class IErc721 {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  DEFAULT_ADMIN_ROLE?: Maybe<Scalars['String']>;
  MINTER_ROLE?: Maybe<Scalars['String']>;
  PAUSER_ROLE?: Maybe<Scalars['String']>;
  approve?: Maybe<Scalars['String']>;
  balanceOf?: Maybe<Scalars['String']>;
  burn?: Maybe<Scalars['String']>;
  getApproved?: Maybe<Scalars['String']>;
  getRoleAdmin?: Maybe<Scalars['String']>;
  getRoleMember?: Maybe<Scalars['String']>;
  getRoleMemberCount?: Maybe<Scalars['String']>;
  grantRole?: Maybe<Scalars['String']>;
  hasRole?: Maybe<Scalars['String']>;
  isApprovedForAll?: Maybe<Scalars['String']>;
  mint?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerOf?: Maybe<Scalars['String']>;
  pause?: Maybe<Scalars['String']>;
  paused?: Maybe<Scalars['String']>;
  renounceRole?: Maybe<Scalars['String']>;
  revokeRole?: Maybe<Scalars['String']>;
  safeTransferFrom?: Maybe<Scalars['String']>;
  setApprovalForAll?: Maybe<Scalars['String']>;
  supportsInterface?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  tokenByIndex?: Maybe<Scalars['String']>;
  tokenOfOwnerByIndex?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['String']>;
  transferFrom?: Maybe<Scalars['String']>;
  unpause?: Maybe<Scalars['String']>;
};


export class IErc721Default_Admin_RoleArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721Minter_RoleArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721Pauser_RoleArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721ApproveArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721BalanceOfArgs {
  cache?: InputMaybe<ICacheInputType>;
  owner?: InputMaybe<Scalars['String']>;
};


export class IErc721BurnArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721GetApprovedArgs {
  cache?: InputMaybe<ICacheInputType>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleAdminArgs {
  cache?: InputMaybe<ICacheInputType>;
  role?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleMemberArgs {
  cache?: InputMaybe<ICacheInputType>;
  role?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleMemberCountArgs {
  cache?: InputMaybe<ICacheInputType>;
  role?: InputMaybe<Scalars['String']>;
};


export class IErc721GrantRoleArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721HasRoleArgs {
  cache?: InputMaybe<ICacheInputType>;
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721IsApprovedForAllArgs {
  cache?: InputMaybe<ICacheInputType>;
  owner?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<Scalars['String']>;
};


export class IErc721MintArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  to?: InputMaybe<Scalars['String']>;
};


export class IErc721NameArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721OwnerOfArgs {
  cache?: InputMaybe<ICacheInputType>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721PauseArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
};


export class IErc721PausedArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721RenounceRoleArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721RevokeRoleArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721SafeTransferFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  _data?: InputMaybe<Scalars['String']>;
};


export class IErc721SetApprovalForAllArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  operator?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['String']>;
};


export class IErc721SupportsInterfaceArgs {
  cache?: InputMaybe<ICacheInputType>;
  interfaceId?: InputMaybe<Scalars['String']>;
};


export class IErc721SymbolArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721TokenByIndexArgs {
  cache?: InputMaybe<ICacheInputType>;
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721TokenOfOwnerByIndexArgs {
  cache?: InputMaybe<ICacheInputType>;
  owner?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721TokenUriArgs {
  cache?: InputMaybe<ICacheInputType>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721TotalSupplyArgs {
  cache?: InputMaybe<ICacheInputType>;
};


export class IErc721TransferFromArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721UnpauseArgs {
  antenna?: InputMaybe<Scalars['Boolean']>;
};

export class IApprovalReturnType {
  needApprove?: Maybe<Scalars['Boolean']>;
  data?: Maybe<Scalars['String']>;
  allownace?: Maybe<Scalars['String']>;
  approveTarget?: Maybe<Scalars['String']>;
};

export class ISwapArgsType {
  sellToken?: InputMaybe<Scalars['String']>;
  buyToken?: InputMaybe<Scalars['String']>;
  sellAmount?: InputMaybe<Scalars['String']>;
  buyAmount?: InputMaybe<Scalars['String']>;
  recipient?: InputMaybe<Scalars['String']>;
  maxDelay?: InputMaybe<Scalars['Int']>;
  lpFee?: InputMaybe<Scalars['Float']>;
  slippagePercentage?: InputMaybe<Scalars['Float']>;
  offlinePrice?: InputMaybe<Scalars['Boolean']>;
  isFeeToken?: InputMaybe<Scalars['Boolean']>;
  chainId?: InputMaybe<Scalars['Int']>;
};

export class IMulticall {
  name?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  UniswapFactory?: Maybe<Array<Maybe<IUniswapFactory>>>;
  UniswapRouter?: Maybe<Array<Maybe<IUniswapRouter>>>;
  LPToken?: Maybe<Array<Maybe<ILpToken>>>;
  WETH?: Maybe<Array<Maybe<IWeth>>>;
  ERC20?: Maybe<Array<Maybe<IErc20>>>;
  ERC721?: Maybe<Array<Maybe<IErc721>>>;
};


export class IMulticallUniswapFactoryArgs {
  address: Array<Scalars['String']>;
};


export class IMulticallUniswapRouterArgs {
  address: Array<Scalars['String']>;
};


export class IMulticallLpTokenArgs {
  address: Array<Scalars['String']>;
};


export class IMulticallWethArgs {
  address: Array<Scalars['String']>;
};


export class IMulticallErc20Args {
  address: Array<Scalars['String']>;
};


export class IMulticallErc721Args {
  address: Array<Scalars['String']>;
};

export class ICrossChainCalls {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  antenna?: InputMaybe<Scalars['Boolean']>;
};

export class ICacheInputType {
  ttl?: InputMaybe<Scalars['Int']>;
  mode?: InputMaybe<ICacheMode>;
  refresh?: InputMaybe<Scalars['Boolean']>;
};

export class INetwork {
  name?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  rpcUrl?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  explorerUrl?: Maybe<Scalars['String']>;
  explorerName?: Maybe<Scalars['String']>;
  nativeCoin?: Maybe<Scalars['String']>;
  blockPerSeconds?: Maybe<Scalars['Int']>;
  multicallAddr?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum IAnyDataField {
  Price = 'price',
  MarketCap = 'market_cap',
  Balance = 'balance'
}

export class IAmount {
  amount?: Maybe<Scalars['String']>;
  withSlippageAmount?: Maybe<Scalars['String']>;
  path?: Maybe<Array<Maybe<IErc20>>>;
  provider?: Maybe<IProviderResponseType>;
  allProvider?: Maybe<Array<Maybe<IProviderResponseType>>>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  router?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  slippagePercentage?: Maybe<Scalars['Float']>;
  priceImpact?: Maybe<Scalars['Float']>;
  sellToken?: Maybe<IErc20>;
  buyToken?: Maybe<IErc20>;
};

export enum ICacheMode {
  Async = 'async',
  Sync = 'sync'
}

export class IProviderResponseType {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
};

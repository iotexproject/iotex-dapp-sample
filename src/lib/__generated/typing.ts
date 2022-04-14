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
  ETH?: Maybe<IMulticall>;
  BSC?: Maybe<IMulticall>;
  Polygon?: Maybe<IMulticall>;
  IoTeX_Mainnet?: Maybe<IMulticall>;
  IoTeX_Testnet?: Maybe<IMulticall>;
  UniswapFactory?: Maybe<Array<Maybe<IUniswapFactory>>>;
  UniswapRouter?: Maybe<Array<Maybe<IUniswapRouter>>>;
  LPToken?: Maybe<Array<Maybe<ILpToken>>>;
  WETH?: Maybe<Array<Maybe<IWeth>>>;
  ERC20?: Maybe<Array<Maybe<IErc20>>>;
  ERC721?: Maybe<Array<Maybe<IErc721>>>;
};


export class IQueryEthArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryBscArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryPolygonArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryIoTeX_MainnetArgs {
  rpcURL?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export class IQueryIoTeX_TestnetArgs {
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
};


export class IUniswapFactoryAllPairsArgs {
  args0?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactoryCreatePairArgs {
  tokenA?: InputMaybe<Scalars['String']>;
  tokenB?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactoryGetPairArgs {
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactorySetFeeToArgs {
  _feeTo?: InputMaybe<Scalars['String']>;
};


export class IUniswapFactorySetFeeToSetterArgs {
  _feeToSetter?: InputMaybe<Scalars['String']>;
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
};


export class IUniswapRouterAddLiquidityArgs {
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
  token?: InputMaybe<Scalars['String']>;
  amountTokenDesired?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountInArgs {
  amountOut?: InputMaybe<Scalars['String']>;
  reserveIn?: InputMaybe<Scalars['String']>;
  reserveOut?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountOutArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  reserveIn?: InputMaybe<Scalars['String']>;
  reserveOut?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountsInArgs {
  amountOut?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterGetAmountsOutArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterQuoteArgs {
  amountA?: InputMaybe<Scalars['String']>;
  reserveA?: InputMaybe<Scalars['String']>;
  reserveB?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityArgs {
  tokenA?: InputMaybe<Scalars['String']>;
  tokenB?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountAMin?: InputMaybe<Scalars['String']>;
  amountBMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityEthArgs {
  token?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterRemoveLiquidityEthSupportingFeeOnTransferTokensArgs {
  token?: InputMaybe<Scalars['String']>;
  liquidity?: InputMaybe<Scalars['String']>;
  amountTokenMin?: InputMaybe<Scalars['String']>;
  amountETHMin?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapEthForExactTokensArgs {
  amountOut?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactEthForTokensArgs {
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactEthForTokensSupportingFeeOnTransferTokensArgs {
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForEthArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForEthSupportingFeeOnTransferTokensArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForTokensArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapExactTokensForTokensSupportingFeeOnTransferTokensArgs {
  amountIn?: InputMaybe<Scalars['String']>;
  amountOutMin?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapTokensForExactEthArgs {
  amountOut?: InputMaybe<Scalars['String']>;
  amountInMax?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapTokensForExactTokensArgs {
  amountOut?: InputMaybe<Scalars['String']>;
  amountInMax?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
};


export class IUniswapRouterSwapArgs {
  args?: InputMaybe<ISwapArgsType>;
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


export class ILpTokenAllowanceArgs {
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class ILpTokenApproveArgs {
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class ILpTokenBalanceOfArgs {
  args0?: InputMaybe<Scalars['String']>;
};


export class ILpTokenBurnArgs {
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenInitializeArgs {
  _token0?: InputMaybe<Scalars['String']>;
  _token1?: InputMaybe<Scalars['String']>;
};


export class ILpTokenMintArgs {
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenSkimArgs {
  to?: InputMaybe<Scalars['String']>;
};


export class ILpTokenSwapArgs {
  amount0Out?: InputMaybe<Scalars['String']>;
  amount1Out?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class ILpTokenTransferArgs {
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class ILpTokenTransferFromArgs {
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


export class IWethAllowanceArgs {
  args0?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IWethApproveArgs {
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethApproveAndCallArgs {
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethBalanceOfArgs {
  args0?: InputMaybe<Scalars['String']>;
};


export class IWethDepositToArgs {
  to?: InputMaybe<Scalars['String']>;
};


export class IWethDepositToAndCallArgs {
  to?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethFlashFeeArgs {
  token?: InputMaybe<Scalars['String']>;
  args1?: InputMaybe<Scalars['String']>;
};


export class IWethFlashLoanArgs {
  receiver?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethMaxFlashLoanArgs {
  token?: InputMaybe<Scalars['String']>;
};


export class IWethNoncesArgs {
  args0?: InputMaybe<Scalars['String']>;
};


export class IWethPermitArgs {
  owner?: InputMaybe<Scalars['String']>;
  spender?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  v?: InputMaybe<Scalars['String']>;
  r?: InputMaybe<Scalars['String']>;
  s?: InputMaybe<Scalars['String']>;
};


export class IWethTransferArgs {
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethTransferAndCallArgs {
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
};


export class IWethTransferFromArgs {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawArgs {
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawFromArgs {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};


export class IWethWithdrawToArgs {
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
  owner?: InputMaybe<Scalars['String']>;
  spender?: InputMaybe<Scalars['String']>;
};


export class IErc20ApproveArgs {
  spender?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20BalanceOfArgs {
  account?: InputMaybe<Scalars['String']>;
};


export class IErc20BurnArgs {
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20BurnFromArgs {
  account?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20DecreaseAllowanceArgs {
  spender?: InputMaybe<Scalars['String']>;
  subtractedValue?: InputMaybe<Scalars['String']>;
};


export class IErc20IncreaseAllowanceArgs {
  spender?: InputMaybe<Scalars['String']>;
  addedValue?: InputMaybe<Scalars['String']>;
};


export class IErc20TransferArgs {
  recipient?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
};


export class IErc20TransferFromArgs {
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


export class IErc721ApproveArgs {
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721BalanceOfArgs {
  owner?: InputMaybe<Scalars['String']>;
};


export class IErc721BurnArgs {
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721GetApprovedArgs {
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleAdminArgs {
  role?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleMemberArgs {
  role?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721GetRoleMemberCountArgs {
  role?: InputMaybe<Scalars['String']>;
};


export class IErc721GrantRoleArgs {
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721HasRoleArgs {
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721IsApprovedForAllArgs {
  owner?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<Scalars['String']>;
};


export class IErc721MintArgs {
  to?: InputMaybe<Scalars['String']>;
};


export class IErc721OwnerOfArgs {
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721RenounceRoleArgs {
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721RevokeRoleArgs {
  role?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
};


export class IErc721SafeTransferFromArgs {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  _data?: InputMaybe<Scalars['String']>;
};


export class IErc721SetApprovalForAllArgs {
  operator?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['String']>;
};


export class IErc721SupportsInterfaceArgs {
  interfaceId?: InputMaybe<Scalars['String']>;
};


export class IErc721TokenByIndexArgs {
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721TokenOfOwnerByIndexArgs {
  owner?: InputMaybe<Scalars['String']>;
  index?: InputMaybe<Scalars['String']>;
};


export class IErc721TokenUriArgs {
  tokenId?: InputMaybe<Scalars['String']>;
};


export class IErc721TransferFromArgs {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
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
  slippagePercentage?: InputMaybe<Scalars['Float']>;
  offlinePrice?: InputMaybe<Scalars['Boolean']>;
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
};

export enum IAnyDataField {
  Price = 'price',
  MarketCap = 'market_cap',
  Balance = 'balance'
}

export class IAmount {
  amount?: Maybe<Scalars['String']>;
  path?: Maybe<Array<Maybe<IErc20>>>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  router?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  slippagePercentage?: Maybe<Scalars['Float']>;
  sellToken?: Maybe<IErc20>;
  buyToken?: Maybe<IErc20>;
};

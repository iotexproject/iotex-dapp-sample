/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Query:{
		ETH:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		Kovan:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		BSC:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		Polygon:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		IoTeX:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		IoTeX_Testnet:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		Polis:{
			rpcURL:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		UniswapFactory:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		UniswapRouter:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		LPToken:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		WETH:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		ERC20:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		ERC721:{
			calls:{
				type:"CrossChainCalls",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		swap:{
			args:{
				type:"SwapArgsType",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	UniswapFactory:{
		INIT_CODE_PAIR_HASH:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		allPairs:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		allPairsLength:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		createPair:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenA:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenB:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		feeTo:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		feeToSetter:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getPair:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			args1:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		setFeeTo:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			_feeTo:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		setFeeToSetter:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			_feeToSetter:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getPairs:{
			address:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			addresses:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			preload:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			token0Address:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			token1Address:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	UniswapRouter:{
		WETH:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		addLiquidity:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenA:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenB:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountADesired:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountBDesired:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountAMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountBMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		addLiquidityETH:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountTokenDesired:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountTokenMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountETHMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		factory:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getAmountIn:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getAmountOut:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getAmountsIn:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		getAmountsOut:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		},
		quote:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountA:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveA:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			reserveB:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		removeLiquidity:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenA:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenB:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			liquidity:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountAMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountBMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		removeLiquidityETH:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			liquidity:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountTokenMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountETHMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		removeLiquidityETHSupportingFeeOnTransferTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			liquidity:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountTokenMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountETHMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapETHForExactTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactETHForTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactETHForTokensSupportingFeeOnTransferTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactTokensForETH:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactTokensForETHSupportingFeeOnTransferTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactTokensForTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapExactTokensForTokensSupportingFeeOnTransferTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountIn:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOutMin:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapTokensForExactETH:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountInMax:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swapTokensForExactTokens:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountOut:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amountInMax:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			path:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swap:{
			args:{
				type:"SwapArgsType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		preload:{
			address:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		}
	},
	LPToken:{
		MINIMUM_LIQUIDITY:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		allowance:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			args1:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		approve:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		balanceOf:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		burn:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		decimals:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		factory:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getReserves:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		initialize:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			_token0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			_token1:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		kLast:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		mint:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		name:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		price0CumulativeLast:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		price1CumulativeLast:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		skim:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		swap:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount0Out:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount1Out:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		symbol:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		sync:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		token0:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		token1:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		totalSupply:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transfer:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transferFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			from:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	WETH:{
		CALLBACK_SUCCESS:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		PERMIT_TYPEHASH:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		allowance:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			args1:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		approve:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		approveAndCall:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		balanceOf:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		decimals:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		deposit:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		depositTo:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		depositToAndCall:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		flashFee:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			args1:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		flashLoan:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			receiver:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		flashMinted:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		maxFlashLoan:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			token:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		name:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		nonces:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			args0:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		permit:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			owner:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			deadline:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			v:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			r:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			s:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		symbol:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		totalSupply:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transfer:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transferAndCall:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transferFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			from:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		withdraw:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		withdrawFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			from:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		withdrawTo:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			value:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	ERC20:{
		allowance:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			owner:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		approve:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		balanceOf:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		burn:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		burnFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		decimals:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		decreaseAllowance:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			subtractedValue:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		increaseAllowance:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			addedValue:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		name:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		symbol:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		totalSupply:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transfer:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			recipient:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transferFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			sender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			recipient:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		checkApproval:{
			user:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
			spender:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
			amount:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:true
			},
			withData:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		any:{
			field:{
				type:"AnyDataField",
				array:false,
				arrayRequired:false,
				required:false
			},
			params:{
				type:"String",
				array:true,
				arrayRequired:false,
				required:false
			}
		}
	},
	ERC721:{
		DEFAULT_ADMIN_ROLE:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		MINTER_ROLE:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		PAUSER_ROLE:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		approve:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		balanceOf:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			owner:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		burn:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getApproved:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getRoleAdmin:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getRoleMember:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			index:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		getRoleMemberCount:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		grantRole:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		hasRole:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		isApprovedForAll:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			owner:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			operator:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		mint:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		name:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		ownerOf:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		pause:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		paused:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		renounceRole:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		revokeRole:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			role:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			account:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		safeTransferFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			from:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			_data:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		setApprovalForAll:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			operator:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			approved:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		supportsInterface:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			interfaceId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		symbol:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		tokenByIndex:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			index:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		tokenOfOwnerByIndex:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			owner:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			index:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		tokenURI:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		totalSupply:{
			cache:{
				type:"CacheInputType",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		transferFrom:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			},
			from:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			to:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			},
			tokenId:{
				type:"String",
				array:false,
				arrayRequired:false,
				required:false
			}
		},
		unpause:{
			antenna:{
				type:"Boolean",
				array:false,
				arrayRequired:false,
				required:false
			}
		}
	},
	SwapArgsType:{
		sellToken:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		buyToken:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		sellAmount:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		buyAmount:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		recipient:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		maxDelay:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		},
		lpFee:{
			type:"Float",
			array:false,
			arrayRequired:false,
			required:false
		},
		slippagePercentage:{
			type:"Float",
			array:false,
			arrayRequired:false,
			required:false
		},
		offlinePrice:{
			type:"Boolean",
			array:false,
			arrayRequired:false,
			required:false
		},
		isFeeToken:{
			type:"Boolean",
			array:false,
			arrayRequired:false,
			required:false
		},
		chainId:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	Multicall:{
		UniswapFactory:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		UniswapRouter:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		LPToken:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		WETH:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		ERC20:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		},
		ERC721:{
			address:{
				type:"String",
				array:true,
				arrayRequired:true,
				required:true
			}
		}
	},
	CrossChainCalls:{
		address:{
			type:"String",
			array:false,
			arrayRequired:false,
			required:false
		},
		chainId:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		},
		antenna:{
			type:"Boolean",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	CacheInputType:{
		ttl:{
			type:"Int",
			array:false,
			arrayRequired:false,
			required:false
		},
		mode:{
			type:"CacheMode",
			array:false,
			arrayRequired:false,
			required:false
		},
		refresh:{
			type:"Boolean",
			array:false,
			arrayRequired:false,
			required:false
		}
	},
	AnyDataField: "enum",
	CacheMode: "enum"
}

export const ReturnTypes: Record<string,any> = {
	Query:{
		ETH:"Multicall",
		Kovan:"Multicall",
		BSC:"Multicall",
		Polygon:"Multicall",
		IoTeX:"Multicall",
		IoTeX_Testnet:"Multicall",
		Polis:"Multicall",
		UniswapFactory:"UniswapFactory",
		UniswapRouter:"UniswapRouter",
		LPToken:"LPToken",
		WETH:"WETH",
		ERC20:"ERC20",
		ERC721:"ERC721",
		networks:"Network",
		swap:"amount"
	},
	UniswapFactory:{
		address:"String",
		chainId:"String",
		INIT_CODE_PAIR_HASH:"String",
		allPairs:"String",
		allPairsLength:"String",
		createPair:"String",
		feeTo:"String",
		feeToSetter:"String",
		getPair:"String",
		setFeeTo:"String",
		setFeeToSetter:"String",
		getPairs:"LPToken"
	},
	UniswapRouter:{
		address:"String",
		chainId:"String",
		WETH:"String",
		addLiquidity:"String",
		addLiquidityETH:"String",
		factory:"String",
		getAmountIn:"String",
		getAmountOut:"String",
		getAmountsIn:"String",
		getAmountsOut:"String",
		quote:"String",
		removeLiquidity:"String",
		removeLiquidityETH:"String",
		removeLiquidityETHSupportingFeeOnTransferTokens:"String",
		swapETHForExactTokens:"String",
		swapExactETHForTokens:"String",
		swapExactETHForTokensSupportingFeeOnTransferTokens:"String",
		swapExactTokensForETH:"String",
		swapExactTokensForETHSupportingFeeOnTransferTokens:"String",
		swapExactTokensForTokens:"String",
		swapExactTokensForTokensSupportingFeeOnTransferTokens:"String",
		swapTokensForExactETH:"String",
		swapTokensForExactTokens:"String",
		swap:"amount",
		preload:"Boolean"
	},
	LPToken:{
		address:"String",
		chainId:"String",
		MINIMUM_LIQUIDITY:"String",
		allowance:"String",
		approve:"String",
		balanceOf:"String",
		burn:"String",
		decimals:"String",
		factory:"String",
		getReserves:"String",
		initialize:"String",
		kLast:"String",
		mint:"String",
		name:"String",
		price0CumulativeLast:"String",
		price1CumulativeLast:"String",
		skim:"String",
		swap:"String",
		symbol:"String",
		sync:"String",
		token0:"String",
		token1:"String",
		totalSupply:"String",
		transfer:"String",
		transferFrom:"String",
		Token0:"ERC20",
		Token1:"ERC20",
		priceUSD:"String",
		totalLiquidityUSD:"String"
	},
	WETH:{
		address:"String",
		chainId:"String",
		CALLBACK_SUCCESS:"String",
		PERMIT_TYPEHASH:"String",
		allowance:"String",
		approve:"String",
		approveAndCall:"String",
		balanceOf:"String",
		decimals:"String",
		deposit:"String",
		depositTo:"String",
		depositToAndCall:"String",
		flashFee:"String",
		flashLoan:"String",
		flashMinted:"String",
		maxFlashLoan:"String",
		name:"String",
		nonces:"String",
		permit:"String",
		symbol:"String",
		totalSupply:"String",
		transfer:"String",
		transferAndCall:"String",
		transferFrom:"String",
		withdraw:"String",
		withdrawFrom:"String",
		withdrawTo:"String"
	},
	ERC20:{
		address:"String",
		chainId:"String",
		allowance:"String",
		approve:"String",
		balanceOf:"String",
		burn:"String",
		burnFrom:"String",
		decimals:"String",
		decreaseAllowance:"String",
		increaseAllowance:"String",
		name:"String",
		symbol:"String",
		totalSupply:"String",
		transfer:"String",
		transferFrom:"String",
		checkApproval:"ApprovalReturnType",
		any:"String"
	},
	ERC721:{
		address:"String",
		chainId:"String",
		DEFAULT_ADMIN_ROLE:"String",
		MINTER_ROLE:"String",
		PAUSER_ROLE:"String",
		approve:"String",
		balanceOf:"String",
		burn:"String",
		getApproved:"String",
		getRoleAdmin:"String",
		getRoleMember:"String",
		getRoleMemberCount:"String",
		grantRole:"String",
		hasRole:"String",
		isApprovedForAll:"String",
		mint:"String",
		name:"String",
		ownerOf:"String",
		pause:"String",
		paused:"String",
		renounceRole:"String",
		revokeRole:"String",
		safeTransferFrom:"String",
		setApprovalForAll:"String",
		supportsInterface:"String",
		symbol:"String",
		tokenByIndex:"String",
		tokenOfOwnerByIndex:"String",
		tokenURI:"String",
		totalSupply:"String",
		transferFrom:"String",
		unpause:"String"
	},
	ApprovalReturnType:{
		needApprove:"Boolean",
		data:"String",
		allownace:"String",
		approveTarget:"String"
	},
	Multicall:{
		name:"String",
		chainId:"String",
		UniswapFactory:"UniswapFactory",
		UniswapRouter:"UniswapRouter",
		LPToken:"LPToken",
		WETH:"WETH",
		ERC20:"ERC20",
		ERC721:"ERC721"
	},
	Network:{
		name:"String",
		chainId:"Int",
		rpcUrl:"String",
		logoUrl:"String",
		explorerUrl:"String",
		explorerName:"String",
		nativeCoin:"String",
		blockPerSeconds:"Int",
		multicallAddr:"String",
		type:"String"
	},
	amount:{
		amount:"String",
		withSlippageAmount:"String",
		path:"ERC20",
		provider:"ProviderResponseType",
		allProvider:"ProviderResponseType",
		from:"String",
		to:"String",
		router:"String",
		data:"String",
		value:"String",
		slippagePercentage:"Float",
		priceImpact:"Float",
		sellToken:"ERC20",
		buyToken:"ERC20"
	},
	ProviderResponseType:{
		name:"String",
		address:"String",
		chainId:"Int"
	}
}
type ZEUS_INTERFACES = never
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["Query"]: AliasType<{
ETH?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
Kovan?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
BSC?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
Polygon?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
IoTeX?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
IoTeX_Testnet?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
Polis?: [{	rpcURL?:(string | undefined | null)[]},ValueTypes["Multicall"]],
UniswapFactory?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["UniswapFactory"]],
UniswapRouter?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["UniswapRouter"]],
LPToken?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["LPToken"]],
WETH?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["WETH"]],
ERC20?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["ERC20"]],
ERC721?: [{	calls?:(ValueTypes["CrossChainCalls"] | undefined | null)[]},ValueTypes["ERC721"]],
	networks?:ValueTypes["Network"],
swap?: [{	args?:ValueTypes["SwapArgsType"] | null},ValueTypes["amount"]],
		__typename?: boolean
}>;
	["UniswapFactory"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
INIT_CODE_PAIR_HASH?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
allPairs?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null},boolean],
allPairsLength?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
createPair?: [{	antenna?:boolean | null,	tokenA?:string | null,	tokenB?:string | null},boolean],
feeTo?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
feeToSetter?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
getPair?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null,	args1?:string | null},boolean],
setFeeTo?: [{	antenna?:boolean | null,	_feeTo?:string | null},boolean],
setFeeToSetter?: [{	antenna?:boolean | null,	_feeToSetter?:string | null},boolean],
getPairs?: [{	address?:(string | undefined | null)[],	addresses?:(string | undefined | null)[],	preload?:boolean | null,	token0Address?:string | null,	token1Address?:string | null,	cache?:ValueTypes["CacheInputType"] | null},ValueTypes["LPToken"]],
		__typename?: boolean
}>;
	["UniswapRouter"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
WETH?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
addLiquidity?: [{	antenna?:boolean | null,	tokenA?:string | null,	tokenB?:string | null,	amountADesired?:string | null,	amountBDesired?:string | null,	amountAMin?:string | null,	amountBMin?:string | null,	to?:string | null,	deadline?:string | null},boolean],
addLiquidityETH?: [{	antenna?:boolean | null,	token?:string | null,	amountTokenDesired?:string | null,	amountTokenMin?:string | null,	amountETHMin?:string | null,	to?:string | null,	deadline?:string | null},boolean],
factory?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
getAmountIn?: [{	antenna?:boolean | null,	amountOut?:string | null,	reserveIn?:string | null,	reserveOut?:string | null},boolean],
getAmountOut?: [{	antenna?:boolean | null,	amountIn?:string | null,	reserveIn?:string | null,	reserveOut?:string | null},boolean],
getAmountsIn?: [{	cache?:ValueTypes["CacheInputType"] | null,	amountOut?:string | null,	path?:(string | undefined | null)[]},boolean],
getAmountsOut?: [{	cache?:ValueTypes["CacheInputType"] | null,	amountIn?:string | null,	path?:(string | undefined | null)[]},boolean],
quote?: [{	antenna?:boolean | null,	amountA?:string | null,	reserveA?:string | null,	reserveB?:string | null},boolean],
removeLiquidity?: [{	antenna?:boolean | null,	tokenA?:string | null,	tokenB?:string | null,	liquidity?:string | null,	amountAMin?:string | null,	amountBMin?:string | null,	to?:string | null,	deadline?:string | null},boolean],
removeLiquidityETH?: [{	antenna?:boolean | null,	token?:string | null,	liquidity?:string | null,	amountTokenMin?:string | null,	amountETHMin?:string | null,	to?:string | null,	deadline?:string | null},boolean],
removeLiquidityETHSupportingFeeOnTransferTokens?: [{	antenna?:boolean | null,	token?:string | null,	liquidity?:string | null,	amountTokenMin?:string | null,	amountETHMin?:string | null,	to?:string | null,	deadline?:string | null},boolean],
swapETHForExactTokens?: [{	antenna?:boolean | null,	amountOut?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactETHForTokens?: [{	antenna?:boolean | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactETHForTokensSupportingFeeOnTransferTokens?: [{	antenna?:boolean | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactTokensForETH?: [{	antenna?:boolean | null,	amountIn?:string | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactTokensForETHSupportingFeeOnTransferTokens?: [{	antenna?:boolean | null,	amountIn?:string | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactTokensForTokens?: [{	antenna?:boolean | null,	amountIn?:string | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapExactTokensForTokensSupportingFeeOnTransferTokens?: [{	antenna?:boolean | null,	amountIn?:string | null,	amountOutMin?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapTokensForExactETH?: [{	antenna?:boolean | null,	amountOut?:string | null,	amountInMax?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swapTokensForExactTokens?: [{	antenna?:boolean | null,	amountOut?:string | null,	amountInMax?:string | null,	path?:(string | undefined | null)[],	to?:string | null,	deadline?:string | null},boolean],
swap?: [{	args?:ValueTypes["SwapArgsType"] | null},ValueTypes["amount"]],
preload?: [{	address?:(string | undefined | null)[]},boolean],
		__typename?: boolean
}>;
	["LPToken"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
MINIMUM_LIQUIDITY?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
allowance?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null,	args1?:string | null},boolean],
approve?: [{	antenna?:boolean | null,	spender?:string | null,	value?:string | null},boolean],
balanceOf?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null},boolean],
burn?: [{	antenna?:boolean | null,	to?:string | null},boolean],
decimals?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
factory?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
getReserves?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
initialize?: [{	antenna?:boolean | null,	_token0?:string | null,	_token1?:string | null},boolean],
kLast?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
mint?: [{	antenna?:boolean | null,	to?:string | null},boolean],
name?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
price0CumulativeLast?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
price1CumulativeLast?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
skim?: [{	antenna?:boolean | null,	to?:string | null},boolean],
swap?: [{	antenna?:boolean | null,	amount0Out?:string | null,	amount1Out?:string | null,	to?:string | null,	data?:string | null},boolean],
symbol?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
sync?: [{	antenna?:boolean | null},boolean],
token0?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
token1?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
totalSupply?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
transfer?: [{	antenna?:boolean | null,	to?:string | null,	value?:string | null},boolean],
transferFrom?: [{	antenna?:boolean | null,	from?:string | null,	to?:string | null,	value?:string | null},boolean],
	Token0?:ValueTypes["ERC20"],
	Token1?:ValueTypes["ERC20"],
	priceUSD?:boolean,
	totalLiquidityUSD?:boolean,
		__typename?: boolean
}>;
	["WETH"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
CALLBACK_SUCCESS?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
PERMIT_TYPEHASH?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
allowance?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null,	args1?:string | null},boolean],
approve?: [{	antenna?:boolean | null,	spender?:string | null,	value?:string | null},boolean],
approveAndCall?: [{	antenna?:boolean | null,	spender?:string | null,	value?:string | null,	data?:string | null},boolean],
balanceOf?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null},boolean],
decimals?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
deposit?: [{	antenna?:boolean | null},boolean],
depositTo?: [{	antenna?:boolean | null,	to?:string | null},boolean],
depositToAndCall?: [{	antenna?:boolean | null,	to?:string | null,	data?:string | null},boolean],
flashFee?: [{	cache?:ValueTypes["CacheInputType"] | null,	token?:string | null,	args1?:string | null},boolean],
flashLoan?: [{	antenna?:boolean | null,	receiver?:string | null,	token?:string | null,	value?:string | null,	data?:string | null},boolean],
flashMinted?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
maxFlashLoan?: [{	cache?:ValueTypes["CacheInputType"] | null,	token?:string | null},boolean],
name?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
nonces?: [{	cache?:ValueTypes["CacheInputType"] | null,	args0?:string | null},boolean],
permit?: [{	antenna?:boolean | null,	owner?:string | null,	spender?:string | null,	value?:string | null,	deadline?:string | null,	v?:string | null,	r?:string | null,	s?:string | null},boolean],
symbol?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
totalSupply?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
transfer?: [{	antenna?:boolean | null,	to?:string | null,	value?:string | null},boolean],
transferAndCall?: [{	antenna?:boolean | null,	to?:string | null,	value?:string | null,	data?:string | null},boolean],
transferFrom?: [{	antenna?:boolean | null,	from?:string | null,	to?:string | null,	value?:string | null},boolean],
withdraw?: [{	antenna?:boolean | null,	value?:string | null},boolean],
withdrawFrom?: [{	antenna?:boolean | null,	from?:string | null,	to?:string | null,	value?:string | null},boolean],
withdrawTo?: [{	antenna?:boolean | null,	to?:string | null,	value?:string | null},boolean],
		__typename?: boolean
}>;
	["ERC20"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
allowance?: [{	cache?:ValueTypes["CacheInputType"] | null,	owner?:string | null,	spender?:string | null},boolean],
approve?: [{	antenna?:boolean | null,	spender?:string | null,	amount?:string | null},boolean],
balanceOf?: [{	cache?:ValueTypes["CacheInputType"] | null,	account?:string | null},boolean],
burn?: [{	antenna?:boolean | null,	amount?:string | null},boolean],
burnFrom?: [{	antenna?:boolean | null,	account?:string | null,	amount?:string | null},boolean],
decimals?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
decreaseAllowance?: [{	antenna?:boolean | null,	spender?:string | null,	subtractedValue?:string | null},boolean],
increaseAllowance?: [{	antenna?:boolean | null,	spender?:string | null,	addedValue?:string | null},boolean],
name?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
symbol?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
totalSupply?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
transfer?: [{	antenna?:boolean | null,	recipient?:string | null,	amount?:string | null},boolean],
transferFrom?: [{	antenna?:boolean | null,	sender?:string | null,	recipient?:string | null,	amount?:string | null},boolean],
checkApproval?: [{	user:string,	spender:string,	amount:string,	withData?:boolean | null},ValueTypes["ApprovalReturnType"]],
any?: [{	field?:ValueTypes["AnyDataField"] | null,	params?:(string | undefined | null)[]},boolean],
		__typename?: boolean
}>;
	["ERC721"]: AliasType<{
	address?:boolean,
	chainId?:boolean,
DEFAULT_ADMIN_ROLE?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
MINTER_ROLE?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
PAUSER_ROLE?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
approve?: [{	antenna?:boolean | null,	to?:string | null,	tokenId?:string | null},boolean],
balanceOf?: [{	cache?:ValueTypes["CacheInputType"] | null,	owner?:string | null},boolean],
burn?: [{	antenna?:boolean | null,	tokenId?:string | null},boolean],
getApproved?: [{	cache?:ValueTypes["CacheInputType"] | null,	tokenId?:string | null},boolean],
getRoleAdmin?: [{	cache?:ValueTypes["CacheInputType"] | null,	role?:string | null},boolean],
getRoleMember?: [{	cache?:ValueTypes["CacheInputType"] | null,	role?:string | null,	index?:string | null},boolean],
getRoleMemberCount?: [{	cache?:ValueTypes["CacheInputType"] | null,	role?:string | null},boolean],
grantRole?: [{	antenna?:boolean | null,	role?:string | null,	account?:string | null},boolean],
hasRole?: [{	cache?:ValueTypes["CacheInputType"] | null,	role?:string | null,	account?:string | null},boolean],
isApprovedForAll?: [{	cache?:ValueTypes["CacheInputType"] | null,	owner?:string | null,	operator?:string | null},boolean],
mint?: [{	antenna?:boolean | null,	to?:string | null},boolean],
name?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
ownerOf?: [{	cache?:ValueTypes["CacheInputType"] | null,	tokenId?:string | null},boolean],
pause?: [{	antenna?:boolean | null},boolean],
paused?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
renounceRole?: [{	antenna?:boolean | null,	role?:string | null,	account?:string | null},boolean],
revokeRole?: [{	antenna?:boolean | null,	role?:string | null,	account?:string | null},boolean],
safeTransferFrom?: [{	antenna?:boolean | null,	from?:string | null,	to?:string | null,	tokenId?:string | null,	_data?:string | null},boolean],
setApprovalForAll?: [{	antenna?:boolean | null,	operator?:string | null,	approved?:string | null},boolean],
supportsInterface?: [{	cache?:ValueTypes["CacheInputType"] | null,	interfaceId?:string | null},boolean],
symbol?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
tokenByIndex?: [{	cache?:ValueTypes["CacheInputType"] | null,	index?:string | null},boolean],
tokenOfOwnerByIndex?: [{	cache?:ValueTypes["CacheInputType"] | null,	owner?:string | null,	index?:string | null},boolean],
tokenURI?: [{	cache?:ValueTypes["CacheInputType"] | null,	tokenId?:string | null},boolean],
totalSupply?: [{	cache?:ValueTypes["CacheInputType"] | null},boolean],
transferFrom?: [{	antenna?:boolean | null,	from?:string | null,	to?:string | null,	tokenId?:string | null},boolean],
unpause?: [{	antenna?:boolean | null},boolean],
		__typename?: boolean
}>;
	["ApprovalReturnType"]: AliasType<{
	needApprove?:boolean,
	data?:boolean,
	allownace?:boolean,
	approveTarget?:boolean,
		__typename?: boolean
}>;
	["SwapArgsType"]: {
	sellToken?:string | null,
	buyToken?:string | null,
	sellAmount?:string | null,
	buyAmount?:string | null,
	recipient?:string | null,
	maxDelay?:number | null,
	lpFee?:number | null,
	slippagePercentage?:number | null,
	offlinePrice?:boolean | null,
	isFeeToken?:boolean | null,
	chainId?:number | null
};
	["Multicall"]: AliasType<{
	name?:boolean,
	chainId?:boolean,
UniswapFactory?: [{	address:string[]},ValueTypes["UniswapFactory"]],
UniswapRouter?: [{	address:string[]},ValueTypes["UniswapRouter"]],
LPToken?: [{	address:string[]},ValueTypes["LPToken"]],
WETH?: [{	address:string[]},ValueTypes["WETH"]],
ERC20?: [{	address:string[]},ValueTypes["ERC20"]],
ERC721?: [{	address:string[]},ValueTypes["ERC721"]],
		__typename?: boolean
}>;
	["CrossChainCalls"]: {
	address?:string | null,
	chainId?:number | null,
	antenna?:boolean | null
};
	["CacheInputType"]: {
	ttl?:number | null,
	mode?:ValueTypes["CacheMode"] | null,
	refresh?:boolean | null
};
	["Network"]: AliasType<{
	name?:boolean,
	chainId?:boolean,
	rpcUrl?:boolean,
	logoUrl?:boolean,
	explorerUrl?:boolean,
	explorerName?:boolean,
	nativeCoin?:boolean,
	blockPerSeconds?:boolean,
	multicallAddr?:boolean,
	type?:boolean,
		__typename?: boolean
}>;
	["AnyDataField"]:AnyDataField;
	["amount"]: AliasType<{
	amount?:boolean,
	withSlippageAmount?:boolean,
	path?:ValueTypes["ERC20"],
	provider?:ValueTypes["ProviderResponseType"],
	allProvider?:ValueTypes["ProviderResponseType"],
	from?:boolean,
	to?:boolean,
	router?:boolean,
	data?:boolean,
	value?:boolean,
	slippagePercentage?:boolean,
	priceImpact?:boolean,
	sellToken?:ValueTypes["ERC20"],
	buyToken?:ValueTypes["ERC20"],
		__typename?: boolean
}>;
	["CacheMode"]:CacheMode;
	["ProviderResponseType"]: AliasType<{
	name?:boolean,
	address?:boolean,
	chainId?:boolean,
		__typename?: boolean
}>
  }

export type ModelTypes = {
    ["Query"]: {
		ETH?:ModelTypes["Multicall"],
	Kovan?:ModelTypes["Multicall"],
	BSC?:ModelTypes["Multicall"],
	Polygon?:ModelTypes["Multicall"],
	IoTeX?:ModelTypes["Multicall"],
	IoTeX_Testnet?:ModelTypes["Multicall"],
	Polis?:ModelTypes["Multicall"],
	UniswapFactory?:(ModelTypes["UniswapFactory"] | undefined)[],
	UniswapRouter?:(ModelTypes["UniswapRouter"] | undefined)[],
	LPToken?:(ModelTypes["LPToken"] | undefined)[],
	WETH?:(ModelTypes["WETH"] | undefined)[],
	ERC20?:(ModelTypes["ERC20"] | undefined)[],
	ERC721?:(ModelTypes["ERC721"] | undefined)[],
	networks?:(ModelTypes["Network"] | undefined)[],
	swap?:ModelTypes["amount"]
};
	["UniswapFactory"]: {
		address?:string,
	chainId?:string,
	INIT_CODE_PAIR_HASH?:string,
	allPairs?:string,
	allPairsLength?:string,
	createPair?:string,
	feeTo?:string,
	feeToSetter?:string,
	getPair?:string,
	setFeeTo?:string,
	setFeeToSetter?:string,
	getPairs?:(ModelTypes["LPToken"] | undefined)[]
};
	["UniswapRouter"]: {
		address?:string,
	chainId?:string,
	WETH?:string,
	addLiquidity?:string,
	addLiquidityETH?:string,
	factory?:string,
	getAmountIn?:string,
	getAmountOut?:string,
	getAmountsIn?:string,
	getAmountsOut?:string,
	quote?:string,
	removeLiquidity?:string,
	removeLiquidityETH?:string,
	removeLiquidityETHSupportingFeeOnTransferTokens?:string,
	swapETHForExactTokens?:string,
	swapExactETHForTokens?:string,
	swapExactETHForTokensSupportingFeeOnTransferTokens?:string,
	swapExactTokensForETH?:string,
	swapExactTokensForETHSupportingFeeOnTransferTokens?:string,
	swapExactTokensForTokens?:string,
	swapExactTokensForTokensSupportingFeeOnTransferTokens?:string,
	swapTokensForExactETH?:string,
	swapTokensForExactTokens?:string,
	swap?:ModelTypes["amount"],
	preload?:boolean
};
	["LPToken"]: {
		address?:string,
	chainId?:string,
	MINIMUM_LIQUIDITY?:string,
	allowance?:string,
	approve?:string,
	balanceOf?:string,
	burn?:string,
	decimals?:string,
	factory?:string,
	getReserves?:string,
	initialize?:string,
	kLast?:string,
	mint?:string,
	name?:string,
	price0CumulativeLast?:string,
	price1CumulativeLast?:string,
	skim?:string,
	swap?:string,
	symbol?:string,
	sync?:string,
	token0?:string,
	token1?:string,
	totalSupply?:string,
	transfer?:string,
	transferFrom?:string,
	Token0?:ModelTypes["ERC20"],
	Token1?:ModelTypes["ERC20"],
	priceUSD?:string,
	totalLiquidityUSD?:string
};
	["WETH"]: {
		address?:string,
	chainId?:string,
	CALLBACK_SUCCESS?:string,
	PERMIT_TYPEHASH?:string,
	allowance?:string,
	approve?:string,
	approveAndCall?:string,
	balanceOf?:string,
	decimals?:string,
	deposit?:string,
	depositTo?:string,
	depositToAndCall?:string,
	flashFee?:string,
	flashLoan?:string,
	flashMinted?:string,
	maxFlashLoan?:string,
	name?:string,
	nonces?:string,
	permit?:string,
	symbol?:string,
	totalSupply?:string,
	transfer?:string,
	transferAndCall?:string,
	transferFrom?:string,
	withdraw?:string,
	withdrawFrom?:string,
	withdrawTo?:string
};
	["ERC20"]: {
		address?:string,
	chainId?:string,
	allowance?:string,
	approve?:string,
	balanceOf?:string,
	burn?:string,
	burnFrom?:string,
	decimals?:string,
	decreaseAllowance?:string,
	increaseAllowance?:string,
	name?:string,
	symbol?:string,
	totalSupply?:string,
	transfer?:string,
	transferFrom?:string,
	checkApproval?:ModelTypes["ApprovalReturnType"],
	any?:string
};
	["ERC721"]: {
		address?:string,
	chainId?:string,
	DEFAULT_ADMIN_ROLE?:string,
	MINTER_ROLE?:string,
	PAUSER_ROLE?:string,
	approve?:string,
	balanceOf?:string,
	burn?:string,
	getApproved?:string,
	getRoleAdmin?:string,
	getRoleMember?:string,
	getRoleMemberCount?:string,
	grantRole?:string,
	hasRole?:string,
	isApprovedForAll?:string,
	mint?:string,
	name?:string,
	ownerOf?:string,
	pause?:string,
	paused?:string,
	renounceRole?:string,
	revokeRole?:string,
	safeTransferFrom?:string,
	setApprovalForAll?:string,
	supportsInterface?:string,
	symbol?:string,
	tokenByIndex?:string,
	tokenOfOwnerByIndex?:string,
	tokenURI?:string,
	totalSupply?:string,
	transferFrom?:string,
	unpause?:string
};
	["ApprovalReturnType"]: {
		needApprove?:boolean,
	data?:string,
	allownace?:string,
	approveTarget?:string
};
	["SwapArgsType"]: GraphQLTypes["SwapArgsType"];
	["Multicall"]: {
		name?:string,
	chainId?:string,
	UniswapFactory?:(ModelTypes["UniswapFactory"] | undefined)[],
	UniswapRouter?:(ModelTypes["UniswapRouter"] | undefined)[],
	LPToken?:(ModelTypes["LPToken"] | undefined)[],
	WETH?:(ModelTypes["WETH"] | undefined)[],
	ERC20?:(ModelTypes["ERC20"] | undefined)[],
	ERC721?:(ModelTypes["ERC721"] | undefined)[]
};
	["CrossChainCalls"]: GraphQLTypes["CrossChainCalls"];
	["CacheInputType"]: GraphQLTypes["CacheInputType"];
	["Network"]: {
		name?:string,
	chainId?:number,
	rpcUrl?:string,
	logoUrl?:string,
	explorerUrl?:string,
	explorerName?:string,
	nativeCoin?:string,
	blockPerSeconds?:number,
	multicallAddr?:string,
	type?:string
};
	["AnyDataField"]: GraphQLTypes["AnyDataField"];
	["amount"]: {
		amount?:string,
	withSlippageAmount?:string,
	path?:(ModelTypes["ERC20"] | undefined)[],
	provider?:ModelTypes["ProviderResponseType"],
	allProvider?:(ModelTypes["ProviderResponseType"] | undefined)[],
	from?:string,
	to?:string,
	router?:string,
	data?:string,
	value?:string,
	slippagePercentage?:number,
	priceImpact?:number,
	sellToken?:ModelTypes["ERC20"],
	buyToken?:ModelTypes["ERC20"]
};
	["CacheMode"]: GraphQLTypes["CacheMode"];
	["ProviderResponseType"]: {
		name?:string,
	address?:string,
	chainId?:number
}
    }

export type GraphQLTypes = {
    ["Query"]: {
	__typename: "Query",
	ETH?: GraphQLTypes["Multicall"],
	Kovan?: GraphQLTypes["Multicall"],
	BSC?: GraphQLTypes["Multicall"],
	Polygon?: GraphQLTypes["Multicall"],
	IoTeX?: GraphQLTypes["Multicall"],
	IoTeX_Testnet?: GraphQLTypes["Multicall"],
	Polis?: GraphQLTypes["Multicall"],
	UniswapFactory?: Array<GraphQLTypes["UniswapFactory"] | undefined>,
	UniswapRouter?: Array<GraphQLTypes["UniswapRouter"] | undefined>,
	LPToken?: Array<GraphQLTypes["LPToken"] | undefined>,
	WETH?: Array<GraphQLTypes["WETH"] | undefined>,
	ERC20?: Array<GraphQLTypes["ERC20"] | undefined>,
	ERC721?: Array<GraphQLTypes["ERC721"] | undefined>,
	networks?: Array<GraphQLTypes["Network"] | undefined>,
	swap?: GraphQLTypes["amount"]
};
	["UniswapFactory"]: {
	__typename: "UniswapFactory",
	address?: string,
	chainId?: string,
	INIT_CODE_PAIR_HASH?: string,
	allPairs?: string,
	allPairsLength?: string,
	createPair?: string,
	feeTo?: string,
	feeToSetter?: string,
	getPair?: string,
	setFeeTo?: string,
	setFeeToSetter?: string,
	getPairs?: Array<GraphQLTypes["LPToken"] | undefined>
};
	["UniswapRouter"]: {
	__typename: "UniswapRouter",
	address?: string,
	chainId?: string,
	WETH?: string,
	addLiquidity?: string,
	addLiquidityETH?: string,
	factory?: string,
	getAmountIn?: string,
	getAmountOut?: string,
	getAmountsIn?: string,
	getAmountsOut?: string,
	quote?: string,
	removeLiquidity?: string,
	removeLiquidityETH?: string,
	removeLiquidityETHSupportingFeeOnTransferTokens?: string,
	swapETHForExactTokens?: string,
	swapExactETHForTokens?: string,
	swapExactETHForTokensSupportingFeeOnTransferTokens?: string,
	swapExactTokensForETH?: string,
	swapExactTokensForETHSupportingFeeOnTransferTokens?: string,
	swapExactTokensForTokens?: string,
	swapExactTokensForTokensSupportingFeeOnTransferTokens?: string,
	swapTokensForExactETH?: string,
	swapTokensForExactTokens?: string,
	swap?: GraphQLTypes["amount"],
	preload?: boolean
};
	["LPToken"]: {
	__typename: "LPToken",
	address?: string,
	chainId?: string,
	MINIMUM_LIQUIDITY?: string,
	allowance?: string,
	approve?: string,
	balanceOf?: string,
	burn?: string,
	decimals?: string,
	factory?: string,
	getReserves?: string,
	initialize?: string,
	kLast?: string,
	mint?: string,
	name?: string,
	price0CumulativeLast?: string,
	price1CumulativeLast?: string,
	skim?: string,
	swap?: string,
	symbol?: string,
	sync?: string,
	token0?: string,
	token1?: string,
	totalSupply?: string,
	transfer?: string,
	transferFrom?: string,
	Token0?: GraphQLTypes["ERC20"],
	Token1?: GraphQLTypes["ERC20"],
	priceUSD?: string,
	totalLiquidityUSD?: string
};
	["WETH"]: {
	__typename: "WETH",
	address?: string,
	chainId?: string,
	CALLBACK_SUCCESS?: string,
	PERMIT_TYPEHASH?: string,
	allowance?: string,
	approve?: string,
	approveAndCall?: string,
	balanceOf?: string,
	decimals?: string,
	deposit?: string,
	depositTo?: string,
	depositToAndCall?: string,
	flashFee?: string,
	flashLoan?: string,
	flashMinted?: string,
	maxFlashLoan?: string,
	name?: string,
	nonces?: string,
	permit?: string,
	symbol?: string,
	totalSupply?: string,
	transfer?: string,
	transferAndCall?: string,
	transferFrom?: string,
	withdraw?: string,
	withdrawFrom?: string,
	withdrawTo?: string
};
	["ERC20"]: {
	__typename: "ERC20",
	address?: string,
	chainId?: string,
	allowance?: string,
	approve?: string,
	balanceOf?: string,
	burn?: string,
	burnFrom?: string,
	decimals?: string,
	decreaseAllowance?: string,
	increaseAllowance?: string,
	name?: string,
	symbol?: string,
	totalSupply?: string,
	transfer?: string,
	transferFrom?: string,
	checkApproval?: GraphQLTypes["ApprovalReturnType"],
	any?: string
};
	["ERC721"]: {
	__typename: "ERC721",
	address?: string,
	chainId?: string,
	DEFAULT_ADMIN_ROLE?: string,
	MINTER_ROLE?: string,
	PAUSER_ROLE?: string,
	approve?: string,
	balanceOf?: string,
	burn?: string,
	getApproved?: string,
	getRoleAdmin?: string,
	getRoleMember?: string,
	getRoleMemberCount?: string,
	grantRole?: string,
	hasRole?: string,
	isApprovedForAll?: string,
	mint?: string,
	name?: string,
	ownerOf?: string,
	pause?: string,
	paused?: string,
	renounceRole?: string,
	revokeRole?: string,
	safeTransferFrom?: string,
	setApprovalForAll?: string,
	supportsInterface?: string,
	symbol?: string,
	tokenByIndex?: string,
	tokenOfOwnerByIndex?: string,
	tokenURI?: string,
	totalSupply?: string,
	transferFrom?: string,
	unpause?: string
};
	["ApprovalReturnType"]: {
	__typename: "ApprovalReturnType",
	needApprove?: boolean,
	data?: string,
	allownace?: string,
	approveTarget?: string
};
	["SwapArgsType"]: {
		sellToken?: string,
	buyToken?: string,
	sellAmount?: string,
	buyAmount?: string,
	recipient?: string,
	maxDelay?: number,
	lpFee?: number,
	slippagePercentage?: number,
	offlinePrice?: boolean,
	isFeeToken?: boolean,
	chainId?: number
};
	["Multicall"]: {
	__typename: "Multicall",
	name?: string,
	chainId?: string,
	UniswapFactory?: Array<GraphQLTypes["UniswapFactory"] | undefined>,
	UniswapRouter?: Array<GraphQLTypes["UniswapRouter"] | undefined>,
	LPToken?: Array<GraphQLTypes["LPToken"] | undefined>,
	WETH?: Array<GraphQLTypes["WETH"] | undefined>,
	ERC20?: Array<GraphQLTypes["ERC20"] | undefined>,
	ERC721?: Array<GraphQLTypes["ERC721"] | undefined>
};
	["CrossChainCalls"]: {
		address?: string,
	chainId?: number,
	antenna?: boolean
};
	["CacheInputType"]: {
		ttl?: number,
	mode?: GraphQLTypes["CacheMode"],
	refresh?: boolean
};
	["Network"]: {
	__typename: "Network",
	name?: string,
	chainId?: number,
	rpcUrl?: string,
	logoUrl?: string,
	explorerUrl?: string,
	explorerName?: string,
	nativeCoin?: string,
	blockPerSeconds?: number,
	multicallAddr?: string,
	type?: string
};
	["AnyDataField"]: AnyDataField;
	["amount"]: {
	__typename: "amount",
	amount?: string,
	withSlippageAmount?: string,
	path?: Array<GraphQLTypes["ERC20"] | undefined>,
	provider?: GraphQLTypes["ProviderResponseType"],
	allProvider?: Array<GraphQLTypes["ProviderResponseType"] | undefined>,
	from?: string,
	to?: string,
	router?: string,
	data?: string,
	value?: string,
	slippagePercentage?: number,
	priceImpact?: number,
	sellToken?: GraphQLTypes["ERC20"],
	buyToken?: GraphQLTypes["ERC20"]
};
	["CacheMode"]: CacheMode;
	["ProviderResponseType"]: {
	__typename: "ProviderResponseType",
	name?: string,
	address?: string,
	chainId?: number
}
    }
export const enum AnyDataField {
	price = "price",
	market_cap = "market_cap",
	balance = "balance"
}
export const enum CacheMode {
	async = "async",
	sync = "sync"
}
export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type WithTypeNameValue<T> = T & {
  __typename?: boolean;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P]>
          : {}
        : never;
    }[keyof DST] &
      {
        [P in keyof Omit<
          Pick<
            SRC,
            {
              [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
            }[keyof DST]
          >,
          '__typename'
        >]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };

export type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
export type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationOptions = {
  variables?: Record<string, any>;
  operationName?: string;
};
export type SubscriptionToGraphQL<Z, T> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z>; errors?: string[] }) => void) => void;
  open: () => void;
};
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket?: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;



export const ZeusSelect = <T>() => ((t: any) => t) as SelectionFunction<T>;

export const ScalarResolver = (scalar: string, value: any) => {
  switch (scalar) {
    case 'String':
      return  `${JSON.stringify(value)}`;
    case 'Int':
      return `${value}`;
    case 'Float':
      return `${value}`;
    case 'Boolean':
      return `${value}`;
    case 'ID':
      return `"${value}"`;
    case 'enum':
      return `${value}`;
    case 'scalar':
      return `${value}`;
    default:
      return false;
  }
};


export const TypesPropsResolver = ({
    value,
    type,
    name,
    key,
    blockArrays
}: {
    value: any;
    type: string;
    name: string;
    key?: string;
    blockArrays?: boolean;
}): string => {
    if (value === null) {
        return `null`;
    }
    let resolvedValue = AllTypesProps[type][name];
    if (key) {
        resolvedValue = resolvedValue[key];
    }
    if (!resolvedValue) {
        throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
    }
    const typeResolved = resolvedValue.type;
    const isArray = resolvedValue.array;
    const isArrayRequired = resolvedValue.arrayRequired;
    if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
        const isRequired = resolvedValue.required ? '!' : '';
        let t = `${typeResolved}`;
        if (isArray) {
          if (isRequired) {
              t = `${t}!`;
          }
          t = `[${t}]`;
          if(isArrayRequired){
            t = `${t}!`;
          }
        }else{
          if (isRequired) {
                t = `${t}!`;
          }
        }
        return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${t}`;
    }
    if (isArray && !blockArrays) {
        return `[${value
        .map((v: any) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
        .join(',')}]`;
    }
    const reslovedScalar = ScalarResolver(typeResolved, value);
    if (!reslovedScalar) {
        const resolvedType = AllTypesProps[typeResolved];
        if (typeof resolvedType === 'object') {
        const argsKeys = Object.keys(resolvedType);
        return `{${argsKeys
            .filter((ak) => value[ak] !== undefined)
            .map(
            (ak) => `${ak}:${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}`
            )}}`;
        }
        return ScalarResolver(AllTypesProps[typeResolved], value) as string;
    }
    return reslovedScalar;
};


const isArrayFunction = (
  parent: string[],
  a: any[]
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const keyValues = Object.keys(values).filter((k) => typeof values[k] !== 'undefined');

  if (!keys.length) {
      return keyValues.length > 0
        ? `(${keyValues
            .map(
              (v) =>
                `${v}:${TypesPropsResolver({
                  value: values[v],
                  type: mainKey,
                  name: key,
                  key: v
                })}`
            )
            .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
        : traverseToSeekArrays(parent, r);
    }

  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};


const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;


const objectToTree = (o: { [x: string]: boolean | string }): string =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`).join(' ')}}`;


const traverseToSeekArrays = (parent: string[], a?: any): string => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
  let b: Record<string, any> = {};
  if (Array.isArray(a)) {
    return isArrayFunction([...parent], a);
  } else {
    if (typeof a === 'object') {
      Object.keys(a)
        .filter((k) => typeof a[k] !== 'undefined')
        .forEach((k) => {
        if (k === '__alias') {
          Object.keys(a[k]).forEach((aliasKey) => {
            const aliasOperations = a[k][aliasKey];
            const aliasOperationName = Object.keys(aliasOperations)[0];
            const aliasOperation = aliasOperations[aliasOperationName];
            b[
              `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
            ] = traverseToSeekArrays([...parent, aliasOperationName], aliasOperation);
          });
        } else {
          b[k] = traverseToSeekArrays([...parent, k], a[k]);
        }
      });
    } else {
      return '';
    }
  }
  return objectToTree(b);
};  


const buildQuery = (type: string, a?: Record<any, any>) => 
  traverseToSeekArrays([type], a);


const inspectVariables = (query: string) => {
  const regex = /\$\b\w*__ZEUS_VAR__\[?[^!^\]^\s^,^\)^\}]*[!]?[\]]?[!]?/g;
  let result;
  const AllVariables: string[] = [];
  while ((result = regex.exec(query))) {
    if (AllVariables.includes(result[0])) {
      continue;
    }
    AllVariables.push(result[0]);
  }
  if (!AllVariables.length) {
    return query;
  }
  let filteredQuery = query;
  AllVariables.forEach((variable) => {
    while (filteredQuery.includes(variable)) {
      filteredQuery = filteredQuery.replace(variable, variable.split('__ZEUS_VAR__')[0]);
    }
  });
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`;
};


export const queryConstruct = (t: 'query' | 'mutation' | 'subscription', tName: string, operationName?: string) => (o: Record<any, any>) =>
  `${t.toLowerCase()}${operationName ? ' ' + operationName : ''}${inspectVariables(buildQuery(tName, o))}`;
  

export const fullChainConstruct = (fn: FetchFunction) => (t: 'query' | 'mutation' | 'subscription', tName: string) => (
  o: Record<any, any>,
  options?: OperationOptions,
) => fn(queryConstruct(t, tName, options?.operationName)(o), options?.variables).then((r:any) => { 
  seekForAliases(r)
  return r
});


export const fullSubscriptionConstruct = (fn: SubscriptionFunction) => (
  t: 'query' | 'mutation' | 'subscription',
  tName: string,
) => (o: Record<any, any>, options?: OperationOptions) =>
  fn(queryConstruct(t, tName, options?.operationName)(o));


const seekForAliases = (response: any) => {
  const traverseAlias = (value: any) => {
    if (Array.isArray(value)) {
      value.forEach(seekForAliases);
    } else {
      if (typeof value === 'object') {
        seekForAliases(value);
      }
    }
  };
  if (typeof response === 'object' && response) {
    const keys = Object.keys(response);
    if (keys.length < 1) {
      return;
    }
    keys.forEach((k) => {
      const value = response[k];
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__');
        response[alias] = {
          [operation]: value,
        };
        delete response[k];
      }
      traverseAlias(value);
    });
  }
};


export const $ = (t: TemplateStringsArray): any => `ZEUS_VAR$${t.join('')}`;


export const resolverFor = <
  X,
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
>(
  type: T,
  field: Z,
  fn: (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : any,
) => fn as (args?: any,source?: any) => any;


const handleFetchResponse = (
  response: Parameters<Extract<Parameters<ReturnType<typeof fetch>['then']>[0], Function>>[0]
): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response.text().then(text => {
        try { reject(JSON.parse(text)); }
        catch (err) { reject(text); }
      }).catch(reject);
    });
  }
  return response.json();
};

export const apiFetch = (options: fetchOptions) => (query: string, variables: Record<string, any> = {}) => {
    let fetchFunction = fetch;
    let queryString = query;
    let fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query);
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };
  

export const apiSubscription = (options: chainOptions) => (
    query: string,
  ) => {
    try {
      const queryString = options[0] + '?query=' + encodeURIComponent(query);
      const wsString = queryString.replace('http', 'ws');
      const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
      const webSocketOptions = options[1]?.websocket || [host];
      const ws = new WebSocket(...webSocketOptions);
      return {
        ws,
        on: (e: (args: any) => void) => {
          ws.onmessage = (event:any) => {
            if(event.data){
              const parsed = JSON.parse(event.data)
              const data = parsed.data
              if (data) {
                seekForAliases(data);
              }
              return e(data);
            }
          };
        },
        off: (e: (args: any) => void) => {
          ws.onclose = e;
        },
        error: (e: (args: any) => void) => {
          ws.onerror = e;
        },
        open: (e: () => void) => {
          ws.onopen = e;
        },
      };
    } catch {
      throw new Error('No websockets implemented');
    }
  };



const allOperations = {
    "query": "Query"
}

export type GenericOperation<O> = O extends 'query'
  ? "Query"
  : O extends 'mutation'
  ? never
  : never

export const Thunder = (fn: FetchFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions) =>
  fullChainConstruct(fn)(operation, allOperations[operation])(o as any, ops) as Promise<InputType<GraphQLTypes[R], Z>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));  
  
export const SubscriptionThunder = (fn: SubscriptionFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(
  o: Z | ValueTypes[R],
  ops?: OperationOptions
)=>
  fullSubscriptionConstruct(fn)(operation, allOperations[operation])(
    o as any,
    ops,
  ) as SubscriptionToGraphQL<Z, GraphQLTypes[R]>;

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
  o: Z | ValueTypes[R],
  operationName?: string,
) => queryConstruct(operation, allOperations[operation], operationName)(o as any);
export const Selector = <T extends keyof ValueTypes>(key: T) => ZeusSelect<ValueTypes[T]>();
  

export const Gql = Chain('http://localhost:3000/api/graphql')
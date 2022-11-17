import { BigNumber, Contract } from 'ethers';

import { JsonRpcProvider } from '@ethersproject/providers';
import { Pool } from '@uniswap/v3-sdk';
import { uniswapV3PoolAbi } from '../abis/uniswapV3Pool';
import { useConfig } from './use-config';
import { useLakeToken } from './use-lake-token';
import { useUsdtToken } from './use-usdt-token';

interface Immutables {
    fee: number;
    tickSpacing: number;
}

interface State {
    liquidity: BigNumber;
    sqrtPriceX96: BigNumber;
    tick: number;
}

export const useUniswapPool = async (provider: JsonRpcProvider) => {
    const { usdtLakePoolAddress } = useConfig();
    const poolContract = new Contract(
        usdtLakePoolAddress,
        uniswapV3PoolAbi,
        provider,
    );
    const usdt = useUsdtToken();
    const lake = useLakeToken();
    const [immutables, state] = await Promise.all([
        getPoolImmutables(poolContract),
        getPoolState(poolContract),
    ]);
    return new Pool(
        usdt,
        lake,
        immutables.fee,
        state.sqrtPriceX96.toString(),
        state.liquidity.toString(),
        state.tick,
    );
};

const getPoolImmutables = async (
    poolContract: Contract,
): Promise<Immutables> => {
    return {
        fee: await poolContract.fee(),
        tickSpacing: await poolContract.tickSpacing(),
    };
};

const getPoolState = async (poolContract: Contract): Promise<State> => {
    const [liquidity, slot] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
    ]);

    return {
        liquidity,
        sqrtPriceX96: slot[0],
        tick: slot[1],
    };
};

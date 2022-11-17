import { Position, tickToPrice } from '@uniswap/v3-sdk';

import { IPositionDetails } from '../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MAX_TICK } from '../constants/commons';
import { isPositionActive } from '../utils/isPositionActive';
import { useLakeToken } from './use-lake-token';
import { useUniswapPool } from './use-uniswap-pool';
import { useUniswapV3PosContract } from './use-uniswap-v3-pos-contract';
import { useUsdtToken } from './use-usdt-token';

export const usePositionById = async (
    provider: JsonRpcProvider,
    positionId: number,
): Promise<IPositionDetails | undefined> => {
    try {
        const uniswapV3PosContract = useUniswapV3PosContract(provider);
        const quoteToken = useLakeToken();
        const baseToken = useUsdtToken();
        const position = await uniswapV3PosContract.callStatic.positions(
            positionId,
        );

        if (
            isPositionActive(
                position.token0,
                position.token1,
                position.liquidity,
            )
        ) {
            const pos = new Position({
                pool: await useUniswapPool(provider),
                liquidity: position.liquidity,
                tickLower: position.tickLower,
                tickUpper: position.tickUpper,
            });

            return {
                positionId,
                liquidity: pos.liquidity,
                tickLower: pos.tickLower,
                tickUpper: pos.tickUpper,
                lowerPrice:
                    pos.tickLower === -MAX_TICK
                        ? '0'
                        : tickToPrice(
                              baseToken,
                              quoteToken,
                              position.tickLower,
                          ).toSignificant(),
                upperPrice:
                    pos.tickUpper === MAX_TICK
                        ? '∞'
                        : tickToPrice(
                              baseToken,
                              quoteToken,
                              position.tickUpper,
                          ).toSignificant(),
                usdtAmount: Number(pos.amount0.toSignificant(4)),
                lakeAmount: Number(pos.amount1.toSignificant(4)),
            };
        }
    } catch (e) {
        console.error('Failed to get position by id', e);
    }
};

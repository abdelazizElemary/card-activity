import { BigintIsh } from '@uniswap/sdk-core';

export interface IPositionDetails {
    positionId: number;
    liquidity: BigintIsh;
    tickLower: number;
    tickUpper: number;
    lowerPrice: string;
    upperPrice: string;
    usdtAmount: number;
    lakeAmount: number;
}

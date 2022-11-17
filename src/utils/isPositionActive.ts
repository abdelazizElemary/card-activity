import { useConfig } from '../hooks/use-config';

export const isPositionActive = (
    tokenA: string,
    tokenB: string,
    liquidity: number,
) => {
    const { usdtAddress, lakeAddress } = useConfig();
    return (
        tokenA.toLowerCase() === usdtAddress.toLowerCase() &&
        tokenB.toLowerCase() === lakeAddress.toLowerCase() &&
        liquidity > 0
    );
};

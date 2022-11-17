import { JsonRpcProvider } from '@ethersproject/providers';
import { useUniswapV3PosContract } from './use-uniswap-v3-pos-contract';

export const usePositionsCount = async (
    provider: JsonRpcProvider,
    account: string,
) => {
    let positionsCount = 0;
    try {
        const uniswapV3PosContract = useUniswapV3PosContract(provider);
        positionsCount = await uniswapV3PosContract.callStatic.balanceOf(
            account,
        );
    } catch (e) {
        console.error('Failed to get position count', e);
    }
    return positionsCount;
};

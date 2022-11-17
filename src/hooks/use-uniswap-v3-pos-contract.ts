import { Contract } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { nonfungiblePositionManagerAbi } from '../abis/nonfungiblePositionManager';
import { useConfig } from './use-config';

export const useUniswapV3PosContract = (provider: JsonRpcProvider) => {
    const { nonfungiblePositionManagerAddress } = useConfig();
    return new Contract(
        nonfungiblePositionManagerAddress,
        nonfungiblePositionManagerAbi,
        provider,
    );
};

import { IPositionDetails } from '../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { parseBigNumber } from '../utils/parseBigNumber';
import { usePositionById } from './use-position-by-id';
import { usePositionsCount } from './use-positions-count';
import { useUniswapV3PosContract } from './use-uniswap-v3-pos-contract';

export const usePositions = async (
    provider: JsonRpcProvider,
    account: string,
): Promise<IPositionDetails[]> => {
    const positions: IPositionDetails[] = [];
    try {
        const positionsCount = await usePositionsCount(provider, account);
        if (positionsCount > 0) {
            const uniswapV3PosContract = useUniswapV3PosContract(provider);
            for (let i = 0; i < positionsCount; i++) {
                const positionId = parseBigNumber(
                    await uniswapV3PosContract.callStatic.tokenOfOwnerByIndex(
                        account,
                        i,
                    ),
                    0,
                );
                const position = await usePositionById(provider, positionId);
                if (position) {
                    positions.push(position);
                }
            }
        }
    } catch (e) {
        console.error('Failed to get position details', e);
    }
    return positions;
};

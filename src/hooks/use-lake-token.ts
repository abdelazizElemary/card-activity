import { ASSET_LAKE } from '../constants/assets';
import { Token } from '@uniswap/sdk-core';
import { useConfig } from './use-config';

export const useLakeToken = () => {
    const { chainId, lakeAddress } = useConfig();
    return new Token(
        chainId,
        lakeAddress,
        ASSET_LAKE.decimals,
        ASSET_LAKE.symbol,
        ASSET_LAKE.name,
    );
};

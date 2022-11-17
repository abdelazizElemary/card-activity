import { ASSET_USDT } from '../constants/assets';
import { Token } from '@uniswap/sdk-core';
import { useConfig } from './use-config';

export const useUsdtToken = () => {
    const { chainId, usdtAddress } = useConfig();
    return new Token(
        chainId,
        usdtAddress,
        ASSET_USDT.decimals,
        ASSET_USDT.symbol,
        ASSET_USDT.name,
    );
};

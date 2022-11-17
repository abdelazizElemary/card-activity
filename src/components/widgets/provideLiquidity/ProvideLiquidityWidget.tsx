import { ASSET_LAKE, ASSET_USDT } from '../../../constants/assets';
import { useContext, useEffect, useState } from 'react';

import { Button } from '../../button/Button';
import { GradientButton } from '../../button/gradient/GradientButton';
import { IPositionDetails } from '../../../interfaces/positionDetails.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ProvideLiquidityModal } from './liquidity/ProvideLiquidityModal';
import { RemoveLiquidityModal } from './liquidity/RemoveLiquidityModal';
import { StakingModal } from './staking/StakingModal';
import { UnstakingModal } from './staking/UstakingModal';
import { WalletConnectContext } from '../../../context';
import { formatValue } from '../../../utils/formatValue';
import { parseBigNumber } from '../../../utils/parseBigNumber';
import { useConfig } from '../../../hooks/use-config';
import { usePositions } from '../../../hooks/use-positions';
import { useStakedPositions } from '../../../hooks/use-staked-positions';
import { useTokenBalance } from '@usedapp/core';

export const ProvideLiquidityWidget = () => {
    const { account, library } = useContext(WalletConnectContext);
    const { lakeAddress, usdtAddress } = useConfig();
    const [arePositionsLoading, setArePositionsLoading] = useState(true);
    const [positions, setPositions] = useState<IPositionDetails[]>([]);
    const [areStakedPositionsLoading, setAreStakedPositionsLoading] =
        useState(true);
    const [stakedPositions, setStakedPositions] = useState<IPositionDetails[]>(
        [],
    );
    const [isProvideLiquidityModalOpen, setIsProvideLiquidityModalOpen] =
        useState(false);
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] =
        useState(false);
    const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
    const [isUnstakingModalOpen, setIsUnstakingModalOpen] = useState(false);
    const [refreshPositions, setRefreshPositions] = useState(0);
    const [refreshStakedPositions, setRefreshStakedPositions] = useState(0);
    const [lakeBalance, setLakeBalance] = useState(0);
    const [usdtBalance, setUsdtBalance] = useState(0);
    const lakeBalanceAsBigNumber = useTokenBalance(lakeAddress, account);
    const usdtBalanceAsBigNumber = useTokenBalance(usdtAddress, account);

    useEffect(() => {
        const fetchData = async (account: string, library: JsonRpcProvider) => {
            setPositions(await usePositions(library, account));
            setArePositionsLoading(false);
        };

        if (library && account) {
            setArePositionsLoading(true);
            fetchData(account, library).catch(console.error);
        }
    }, [library, account, refreshPositions]);

    useEffect(() => {
        const fetchData = async (account: string, library: JsonRpcProvider) => {
            setStakedPositions(await useStakedPositions(library, account));
            setAreStakedPositionsLoading(false);
        };

        if (library && account) {
            setArePositionsLoading(true);
            fetchData(account, library).catch(console.error);
        }
    }, [library, account, refreshStakedPositions]);

    useEffect(() => {
        setLakeBalance(
            lakeBalanceAsBigNumber
                ? parseBigNumber(lakeBalanceAsBigNumber, ASSET_LAKE.decimals)
                : 0,
        );
    }, [lakeBalanceAsBigNumber]);

    useEffect(() => {
        setUsdtBalance(
            usdtBalanceAsBigNumber
                ? parseBigNumber(usdtBalanceAsBigNumber, ASSET_USDT.decimals)
                : 0,
        );
    }, [usdtBalanceAsBigNumber]);

    return (
        <div className="w-full flex flex-col items-center mt-10 mb-4">
            <div className="w-full flex flex-col items-center">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="PROVIDE LIQUIDITY"
                    onClick={() => {
                        setIsProvideLiquidityModalOpen(true);
                    }}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {formatValue(lakeBalance, ASSET_LAKE.symbol, 0)} AVAILABLE
                </span>
                <ProvideLiquidityModal
                    isOpen={isProvideLiquidityModalOpen}
                    isLoading={arePositionsLoading}
                    positions={positions}
                    lakeBalance={lakeBalance}
                    usdtBalance={usdtBalance}
                    closeModal={() => {
                        setIsProvideLiquidityModalOpen(false);
                    }}
                    refreshPositions={() => {
                        setRefreshPositions(new Date().getTime());
                    }}
                />
            </div>
            <div className="w-full flex flex-col items-center mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="POSITIONS STAKING"
                    onClick={() => {
                        setIsStakingModalOpen(true);
                    }}
                />
                <span className="text-sm tracking-[.1em] my-2">
                    {positions.length} ACTIVE POSITIONS
                </span>
                <StakingModal
                    isOpen={isStakingModalOpen}
                    isLoading={arePositionsLoading}
                    positions={positions}
                    closeModal={() => {
                        setIsStakingModalOpen(false);
                    }}
                    refreshPositions={() => {
                        setRefreshPositions(new Date().getTime());
                    }}
                    refreshStakedPositions={() => {
                        setRefreshStakedPositions(new Date().getTime());
                    }}
                />
            </div>
            {positions.length > 0 && (
                <div className="w-full flex flex-col items-center mt-8">
                    <Button
                        size="medium"
                        disabled={false}
                        text="REMOVE LIQUIDITY"
                        onClick={() => {
                            setIsRemoveLiquidityModalOpen(true);
                        }}
                    />
                    <span className="text-sm tracking-[.1em] my-2">
                        {positions.length} ACTIVE POSITIONS
                    </span>
                    <RemoveLiquidityModal
                        isOpen={isRemoveLiquidityModalOpen}
                        isLoading={arePositionsLoading}
                        positions={positions}
                        closeModal={() => {
                            setIsRemoveLiquidityModalOpen(false);
                        }}
                        refreshPositions={() => {
                            setRefreshPositions(new Date().getTime());
                        }}
                    />
                </div>
            )}
            {stakedPositions.length > 0 && (
                <div className="w-full flex flex-col items-center mt-8">
                    <Button
                        size="medium"
                        disabled={false}
                        text="POSITIONS UNSTAKING"
                        onClick={() => {
                            setIsUnstakingModalOpen(true);
                        }}
                    />
                    <span className="text-sm tracking-[.1em] my-2">
                        {stakedPositions.length} POSITIONS STAKED
                    </span>
                    <UnstakingModal
                        isOpen={isUnstakingModalOpen}
                        isLoading={areStakedPositionsLoading}
                        stakedPositions={stakedPositions}
                        closeModal={() => {
                            setIsUnstakingModalOpen(false);
                        }}
                        refreshPositions={() => {
                            setRefreshPositions(new Date().getTime());
                        }}
                        refreshStakedPositions={() => {
                            setRefreshStakedPositions(new Date().getTime());
                        }}
                    />
                </div>
            )}
        </div>
    );
};

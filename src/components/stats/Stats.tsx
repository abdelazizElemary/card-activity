import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import metamaskIcon from './../../assets/icons/metamask-icon.svg';
import { ASSET_LAKE } from '../../constants/assets';
import { colors } from '../../constants/colors';
import { GradientButtonWithIcon } from '../button/gradient/GradientButtonWithIcon';
import { formatValue } from '../../utils/formatValue';
import { useContext } from 'react';
import { LakeStatsContext } from '../../context';
import { StatElement } from './StatElement';

export const Stats = () => {
    const {
        marketCup,
        prevMarketCup,
        circulationSupply,
        prevCirculationSupply,
        lakePrice,
        prevLakePrice,
        consentsGathered,
        prevConsentsGathered,
    } = useContext(LakeStatsContext);

    const addToMetamask = async () => {
        try {
            const { ethereum } = window as any;
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: ASSET_LAKE.address,
                        symbol: ASSET_LAKE.symbol,
                        decimals: ASSET_LAKE.decimals,
                        image: ASSET_LAKE.image,
                    },
                },
            });
        } catch (ex) {
            console.error(ex);
        }
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-between bg-black-800 rounded-[30px] inset-shadow px-8 py-6">
            <div className="font-kanit-medium color-gray-gradient text-shadow text-2xl tracking-[.12em]">
                $LAKE STATS
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <StatElement
                    title={'MARKET CAP'}
                    currentValue={marketCup}
                    prevValue={prevMarketCup}
                    formattedValue={formatValue(marketCup, '$')}
                />
                <StatElement
                    title={'CIRCULATION SUPPLY'}
                    currentValue={circulationSupply}
                    prevValue={prevCirculationSupply}
                    formattedValue={formatValue(circulationSupply)}
                />
                <StatElement
                    title={'$LAKE PRICE'}
                    currentValue={lakePrice}
                    prevValue={prevLakePrice}
                    formattedValue={formatValue(lakePrice, '$', 4)}
                />
                <StatElement
                    title={'CONSENTS GATHERED'}
                    currentValue={consentsGathered}
                    prevValue={prevConsentsGathered}
                    formattedValue={formatValue(consentsGathered, '', 0)}
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center px-4">
                <div className="mb-6">
                    <GradientButtonWithIcon
                        isSmall={true}
                        disabled={false}
                        text="ADD TO METAMASK"
                        onClick={addToMetamask}
                    >
                        <img src={metamaskIcon} alt="metamask"></img>
                    </GradientButtonWithIcon>
                </div>

                <CopyToClipboard text={ASSET_LAKE.address}>
                    <GradientBorder className="min-w-[14rem] h-[2.5rem] p-px flex justify-center items-center rounded-[32px] cursor-pointer">
                        <div className="w-full h-full flex justify-center items-center rounded-[32px] bg-black-500 px-4">
                            <span className="color-gradient-light tracking-wider text-xs font-medium font-kanit-medium">
                                COPY CONTRACT ADDRESS
                            </span>
                        </div>
                    </GradientBorder>
                </CopyToClipboard>
            </div>
        </div>
    );
};

const GradientBorder = styled.div`
    background: linear-gradient(${colors.purple['300']}, ${colors.blue['300']});
    box-shadow: inset 1px 1px 7px rgba(255, 255, 255, 0.46);
    filter: drop-shadow(0px 0px 3px ${colors.purple['600']})
        drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

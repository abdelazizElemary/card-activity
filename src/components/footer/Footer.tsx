import CopyToClipboard from 'react-copy-to-clipboard';
import { GradientBorder } from '../GradientBorder';
import { formatAddress } from '../../utils/formatAddress';
import logo from '../../assets/icons/lake-logo.svg';
import telegramIcon from '../../assets/icons/telegram-icon.svg';
import twitterIcon from '../../assets/icons/twitter-icon.svg';
import { useConfig } from '../../hooks/use-config';

export const Footer = () => {
    const { lakeAddress } = useConfig();
    return (
        <div className="w-full h-full bg-black-700 rounded-[30px] inset-shadow flex justify-between px-28 items-center">
            <div className="flex flex-col items-center">
                <img
                    className="w-[2.5rem] h-[2.5rem]"
                    src={logo}
                    alt="logo"
                ></img>
                <span className="tracking-[.1em] text-xl font-kanit-regular color-gray-gradient text-shadow my-4">
                    CONTRACT ADDRESS
                </span>
                <CopyToClipboard text={lakeAddress}>
                    <GradientBorder className="min-w-[12rem] h-[2.5rem] p-px flex justify-center items-center rounded-[32px] cursor-pointer">
                        <div className="w-full h-full flex justify-center items-center rounded-[32px] bg-black-500 px-4">
                            <span className="color-gradient-light tracking-wider text-sm font-medium font-kanit-medium">
                                {formatAddress(lakeAddress)}
                            </span>
                        </div>
                    </GradientBorder>
                </CopyToClipboard>
            </div>
            <div className="flex">
                <img
                    className="w-[3rem] h-[3rem] mx-4 cursor-pointer"
                    src={twitterIcon}
                    alt="twitterIcon"
                    onClick={() =>
                        window.open(
                            'https://twitter.com/DataLakeToken?s=20&t=CdHscW2S5BI3WAnGkvff6A',
                            '_blank',
                        )
                    }
                ></img>
                <img
                    className="w-[3rem] h-[3rem] mx-4 cursor-pointer"
                    src={telegramIcon}
                    alt="telegramIcon"
                    onClick={() =>
                        window.open(
                            'https://t.me/LakeTokenAnnouncements',
                            '_blank',
                        )
                    }
                ></img>
            </div>
            <div className="flex flex-col items-center">
                <span className="tracking-[.1em] text-xl font-kanit-light color-gray-gradient text-shadow my-2 cursor-pointer">
                    CONTACT US
                </span>
                <span className="tracking-[.1em] text-xl font-kanit-light color-gray-gradient text-shadow my-2 cursor-pointer">
                    PRIVACY POLICY
                </span>
                <span className="tracking-[.1em] text-xl font-kanit-light color-gray-gradient text-shadow my-2 cursor-pointer">
                    DISCLAIMER
                </span>
            </div>
        </div>
    );
};

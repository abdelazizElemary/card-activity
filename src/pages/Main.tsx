import { useEffect, useState } from 'react';

import { AccountOverview } from '../components/accountOverview/AccountOverview';
import { Disclaimer } from '../components/disclaimer/Disclaimer';
import { Footer } from '../components/footer/Footer';
import { LOADING_DELAY } from '../constants/commons';
import { Loading } from '../components/loading/Loading';
import { Page } from '../components/page/Page';
import { Stats } from '../components/stats/Stats';
import { VestingOverview } from '../components/vestingOverview/VestingOverview';
import { Widgets } from '../components/widgets/Widgets';

export const Main = () => {
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsDisclaimerAccepted(
            localStorage.getItem('isDisclaimerAccepter') === 'true',
        );
        setTimeout(() => {
            setIsLoading(false);
        }, LOADING_DELAY);
    }, []);

    const acceptDisclaimer = () => {
        localStorage.setItem('isDisclaimerAccepter', 'true');
        setIsDisclaimerAccepted(true);
    };
    return (
        <>
            {isLoading && <Loading />}
            {isDisclaimerAccepted && (
                <Page>
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full h-full lg:h-[670px] flex flex-col lg:flex-row justify-between mt-4 lg:mt-0 lg:py-6">
                            <div className="w-full lg:w-[66%]">
                                <AccountOverview />
                            </div>
                            <div className="w-full lg:w-[31%] mt-4 lg:mt-0">
                                <Stats />
                            </div>
                        </div>
                        <div className="hidden lg:block w-full h-[670px] py-6">
                            <Widgets />
                        </div>
                        <div className="w-full h-auto lg:h-[630px] mt-4 lg:mt-0 lg:py-6">
                            <VestingOverview />
                        </div>
                        <div className="w-full h-[260px] mt-4 lg:pt-6 mb-6 lg:pb-10">
                            <Footer />
                        </div>
                    </div>
                </Page>
            )}
            {!isDisclaimerAccepted && !isLoading && (
                <Disclaimer onAcceptClick={acceptDisclaimer} />
            )}
        </>
    );
};

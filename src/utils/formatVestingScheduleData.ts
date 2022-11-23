import {
    getDurationLeft,
    getDurationProgress,
    isVestingScheduleUnlocked,
} from './getDuration';

import { ASSET_LAKE } from '../constants/assets';
import { IBeneficiaryOverview } from '../interfaces/beneficiaryOverview.interface';
import { IVestingSchedule } from '../interfaces/vestingSchedule.interface';
import { getUnlockedAmount } from './getUnlockedAmount';
import { getVestingRateAsString } from './getVestingRateAsString';
import { parseBigNumber } from './parseBigNumber';

export const formatVestingScheduleData = (
    beneficiaryOverview: IBeneficiaryOverview,
    tgeTimestamp: number,
): IVestingSchedule => {
    const { name } = beneficiaryOverview;
    const terms = parseBigNumber(beneficiaryOverview.terms, 0);
    const cliff = parseBigNumber(beneficiaryOverview.cliff, 0);
    const duration = parseBigNumber(beneficiaryOverview.duration, 0);
    const allocatedAmount = parseBigNumber(
        beneficiaryOverview.allocatedAmount,
        ASSET_LAKE.decimals,
    );
    const vestingRate = allocatedAmount / duration;
    const unlockedAmount = getUnlockedAmount(
        cliff,
        terms,
        duration,
        vestingRate,
        tgeTimestamp,
    );
    const withdrawnAmount = parseBigNumber(
        beneficiaryOverview.withdrawnAmount,
        ASSET_LAKE.decimals,
    );

    return {
        name,
        terms,
        cliff,
        duration,
        durationLeft: getDurationLeft(cliff, duration, terms, tgeTimestamp),
        durationProgress: getDurationProgress(
            cliff,
            duration,
            terms,
            tgeTimestamp,
        ),
        vestingRate,
        vestingRateAsString: getVestingRateAsString(
            cliff,
            duration,
            terms,
            tgeTimestamp,
            vestingRate,
        ),
        unlockedAmount,
        isUnlocked: isVestingScheduleUnlocked(
            cliff,
            duration,
            terms,
            tgeTimestamp,
        ),
        allocatedAmount,
        withdrawnAmount,
        availableAmount: unlockedAmount - withdrawnAmount,
    };
};

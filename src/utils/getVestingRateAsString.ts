import { formatValue } from './formatValue';
import { getTermsAsString } from './getTermsAsString';
import { isVestingScheduleUnlocked } from './getDuration';

export const getVestingRateAsString = (
    cliff: number,
    duration: number,
    terms: number,
    tgeTimestamp: number,
    vestingRate: number,
) => {
    return isVestingScheduleUnlocked(cliff, duration, terms, tgeTimestamp)
        ? 'FULLY VESTED'
        : `${formatValue(vestingRate)} $LAKE / ${getTermsAsString(terms)}`;
};

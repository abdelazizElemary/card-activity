export const getUnlockedAmount = (
    cliff: number,
    terms: number,
    duration: number,
    vestingRate: number,
    tgeTimestamp: number,
) => {
    return new Date().getTime() / 1000 -
        tgeTimestamp -
        cliff -
        terms * duration >
        0
        ? duration * vestingRate
        : new Date().getTime() / 1000 - tgeTimestamp - cliff > 0
        ? Math.floor(
              (new Date().getTime() / 1000 - tgeTimestamp - cliff) / terms,
          ) * vestingRate
        : 0;
};

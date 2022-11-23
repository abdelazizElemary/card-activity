import { isPositionActive } from '../../src/utils/isPositionActive';
import { useConfig } from '../../src/hooks/use-config';

describe('Check is position active', () => {
    const { usdtAddress, lakeAddress } = useConfig();
    it('should return true for right position', () => {
        expect(isPositionActive(usdtAddress, lakeAddress, 1)).toBe(true);
    });

    it('should return false for wrong pair', () => {
        expect(isPositionActive(usdtAddress, usdtAddress, 1)).toBe(false);
        expect(isPositionActive(lakeAddress, usdtAddress, 1)).toBe(false);
    });

    it('should return false for position without liquidity', () => {
        expect(isPositionActive(usdtAddress, lakeAddress, 0)).toBe(false);
        expect(isPositionActive(usdtAddress, lakeAddress, -1)).toBe(false);
    });
});

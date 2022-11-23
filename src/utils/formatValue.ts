import { formatNumber } from './formatNumber';
import { getPrecision } from './getPrecision';

export const formatValue = (
    value: number,
    symbol = '',
    precision = -1,
): string => {
    const outputPrecision = getPrecision(value, symbol, precision);

    return (
        `${
            value && parseFloat(value.toFixed(outputPrecision)) <= -0.00001
                ? '-'
                : ''
        }${formatNumber(value, symbol, precision)
            .toFixed(outputPrecision)
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}` +
        (symbol.length > 0 ? ` ${symbol}` : '')
    );
};

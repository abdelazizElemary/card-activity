import { formatNumber } from './formatNumber';
import { getPrecision } from './getPrecision';

export const formatValue = (
    value: number,
    symbol = '',
    precision = -1,
): string => {
    const outputPrecision = getPrecision(value, symbol, precision);
    const valAsString = formatNumber(value, symbol, precision).toFixed(
        outputPrecision,
    );
    const parts = valAsString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (
        `${
            value && parseFloat(value.toFixed(outputPrecision)) <= -0.00001
                ? '-'
                : ''
        }${parts.join('.')}` + (symbol.length > 0 ? ` ${symbol}` : '')
    );
};

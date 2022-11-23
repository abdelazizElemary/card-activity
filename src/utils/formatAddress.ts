export const formatAddress = (address: string): string => {
    return address.length === 0
        ? ''
        : address.slice(0, 6) + '.....' + address.slice(-4);
};

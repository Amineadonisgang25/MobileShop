export const roundNumber = (num:number, decimalPlaces = 2) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
};
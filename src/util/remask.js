import { mask, unMask } from 'remask';

export const maskCpfEvent = (ev) => {
    const originalValue = unMask(ev.target.value);
    const maskedValue = mask(originalValue, [
        '999.999.999-99',
        // '99.999.999/9999-99', cnpj
    ]);
    return maskedValue;
};

export const maskCepEvent = (ev) => {
    const originalValue = unMask(ev.target.value);
    const maskedValue = mask(originalValue, [
        '99999-999',
    ]);
    return maskedValue;
};


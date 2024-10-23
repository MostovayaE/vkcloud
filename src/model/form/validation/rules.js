const PHONE_RX = /\(\d{3}\)\s\d{7}/;
const EMAIL_RX = /^\w+@\w+\.\w+$/;


export function requiredRule(v) {
    if (!v) return 'Обязательно к заполнению';
    return true;
}


export function minLengthRule(length) {

    return function (v) {
        if (v.length < length) {
            return `Минимальная длина должна быть ${length}`;
        }
    };
}


export function emailRule(v) {
    if (!EMAIL_RX.test(v)) return 'Неправильная почта';
    return true;
}


export function phoneRule(v) {
    if (!PHONE_RX.test(v)) return 'Номер телофона должен быть в формате (999) 9999999';
    return true;
}

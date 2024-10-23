/**
 * Пример класса для утилитарных методов.
 */
const dtFormatter = new Intl.DateTimeFormat('ru');

export default class Formatter {
    /**
     * Форматирует дату
     * @static
     * @param {string | number | Date} value дата для форматирования (Date или значение для конструктора Date)
     * @return {string} отформатированная дата
     */
    static formatDate(value) {
        if (!value) return '';
        if (!(value instanceof Date)) value = new Date(value);
        return dtFormatter.format(value);
    }

    /**
     * Болванка
     * @param {*} value что-нибудь.
     * @return {*}
     */
    static formatSomethingElse(value) {
        return value;
    }
}

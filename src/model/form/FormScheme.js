import { BaseInput } from '@/model/form/inputs/BaseInput';

export class FormScheme {
    /** Элементы схемы */
    items;

    /** @param {BaseInput[]} items */
    constructor(items) {
        for (const item of items) {
            if (!(item instanceof BaseInput)) {
                throw new Error(
                    'All form elements should extend BaseInput class'
                );
            }
        }
        this.items = items;
    }

    item(key) {
        return this.items.find((item) => item.key === key);
    }
}

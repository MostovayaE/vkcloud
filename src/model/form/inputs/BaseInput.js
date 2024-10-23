
export class BaseInput {

    TYPE;

    label;

    key;

    validation;


    constructor({ label, key, validation = [] }) {
        if (!key) throw new Error('Key is required');
        this.label = label;
        this.key = key;
        if (validation) {
            if (Array.isArray(validation)) {
                this.validation = validation;
            } else {
                throw new Error('Validation should be an array of functions');
            }
        } else {
            this.validation = [];
        }
    }


    validate(v) {
        let errorMessage = '';
        for (const check of this.validation) {
            const error = check(v);
            if (typeof error === 'string' && error) {
                return error;
            }
        }
        return errorMessage || true;
    }
}

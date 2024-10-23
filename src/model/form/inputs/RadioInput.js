import { BaseInput } from '@/model/form/inputs/BaseInput';

export class RadioInput extends BaseInput {

    TYPE = 'RADIO';

    options;


    constructor(props) {
        super(props);
        const { options } = props;
        if (options && !Array.isArray(options)) {
            throw new Error('Invalid options list');
        }
        this.options = options;
    }
}

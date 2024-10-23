import { BaseInput } from '@/model/form/inputs/BaseInput';



export class ComboboxInput extends BaseInput {

    TYPE = 'COMBOBOX';

    options;

    optionLabel;

    optionValue;

    filter;

    clearIcon;


    constructor(props) {
        super(props);
        const {
            options,
            optionLabel = 'label',
            optionValue = 'value',
            filter = true,
            clearIcon = true,
        } = props;
        if (options && !Array.isArray(options)) {
            throw new Error('Invalid options list');
        }
        this.options = options;
        this.optionValue = optionValue;
        this.optionLabel = optionLabel;
        this.filter = filter;
        this.clearIcon = clearIcon;
    }
}

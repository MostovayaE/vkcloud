import { BaseInput } from '@/model/form/inputs/BaseInput';


export class CheckboxInput extends BaseInput {

    TYPE = 'CHECKBOX';

    binary;


    constructor(props) {
        super(props);
        const { binary = true } = props;
        this.binary = binary;
    }
}

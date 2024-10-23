import { BaseInput } from '@/model/form/inputs/BaseInput';


export class ToggleInput extends BaseInput {

    TYPE = 'TOGGLE';

    onLabel;

    offLabel;

    onIcon;

    offIcon;


    constructor(props) {
        super(props);
        const {
            onLabel = 'ON',
            offLabel = 'OFF',
            onIcon = '',
            offIcon = '',
        } = props;
        this.onLabel = onLabel;
        this.offLabel = offLabel;
        this.onIcon = onIcon;
        this.offIcon = offIcon;
    }
}

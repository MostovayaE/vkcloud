import { BaseInput } from '@/model/form/inputs/BaseInput';


export class MaskInput extends BaseInput {

    TYPE = 'MASK';

    size = 'md';

    icon;

    iconRight = false;

    placeholder;

    mask;


    constructor(props) {
        super(props);
        const { size = 'md', icon, iconRight, placeholder, mask } = props;
        if (!mask) throw new Error('Mask is required');
        this.mask = mask;
        this.size = size;
        this.icon = icon;
        this.iconRight = iconRight;
        this.placeholder = placeholder;
    }
}

import { BaseInput } from '@/model/form/inputs/BaseInput';



export class TextInput extends BaseInput {

    TYPE = 'TEXT';

    size = 'md';


    icon;

    iconRight = false;

    placeholder;


    constructor(props) {
        super(props);
        const { size = 'md', icon, iconRight = false, placeholder } = props;
        this.size = size;
        this.icon = icon;
        this.iconRight = iconRight;
        this.placeholder = placeholder;
    }
}

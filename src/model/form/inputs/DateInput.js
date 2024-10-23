import { BaseInput } from '@/model/form/inputs/BaseInput';



export class DateInput extends BaseInput {

    TYPE = 'DATE';

    showIcon = false;

    dateFormat;

    minDate;

    maxDate;

    showButtonBar = true;

    size;


    constructor(props) {
        super(props);
        const {
            showIcon,
            dateFormat,
            minDate,
            maxDate,
            showButtonBar = true,
            size = 'md',
        } = props;
        this.showIcon = showIcon;
        this.dateFormat = dateFormat;
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.showButtonBar = showButtonBar;
        this.size = size;
    }
}

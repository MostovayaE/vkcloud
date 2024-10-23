export default class Direction {
    dir_id;
    dir_name;
    dir_code;
    magister;
    deleted_at;

    constructor(direction) {
        this.dir_id = direction?.dir_id ?? null;
        this.dir_name = direction?.dir_name ?? null;
        this.dir_code = direction?.dir_code ?? null;
        this.magister = direction?.magister ?? false; // Assuming false is the default value for boolean fields
        this.deleted_at = direction?.deleted_at ?? null;
    }

    // Add any relevant methods or getters below if needed

    get directionDetails() {
        // This method can return a string summarizing the direction details, for example
        return `${this.dir_name} (${this.dir_code})${this.magister ? ' - Magister' : ''}`;
    }
}

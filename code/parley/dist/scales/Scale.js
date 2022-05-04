export class Scale {
    data;
    length;
    direction;
    expand;
    offset;
    constructor(length, direction = 1, expand = 0.1) {
        this.length = length;
        this.direction = direction;
        this.expand = expand;
        this.offset = this.direction === -1 ? this.length : 0;
    }
    registerData = (data) => {
        this.data = data;
    };
}

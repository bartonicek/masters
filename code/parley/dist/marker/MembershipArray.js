export class MembershipArray {
    n;
    array;
    constructor(n) {
        this.n = n;
        this.array = new Array(n).fill(0);
    }
    clear = () => (this.array = new Array(this.n).fill(0));
    receiveAdd = (points, group) => {
        points.forEach((e) => (this.array[e] = group));
    };
    receiveReplace = (points, group) => {
        this.clear();
        points.forEach((e) => (this.array[e] = group));
    };
}

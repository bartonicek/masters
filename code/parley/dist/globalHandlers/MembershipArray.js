export class MembershipArray extends Array {
    put(val) {
        this.push(val);
    }
    clear = () => {
        this.fill(0);
    };
    merge = (arr) => {
        arr.forEach((e, i) => (e !== 0 ? (this[i] = e) : null));
    };
    recieveReplace = (at, membership) => {
        at.forEach((e) => (this[e] = membership));
    };
    receiveClearReplace = (at, membership) => {
        this.clear();
        at.forEach((e) => (this[e] = membership));
    };
}

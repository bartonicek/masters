export class MembershipArray extends Array {
    put(val) {
        this.push(val);
    }
    clear = () => {
        this.fill(0);
    };
    recieveReplace = (at, membership) => {
        at.forEach((e) => (this[e] = membership));
    };
    receiveClearReplace = (at, membership) => {
        this.clear();
        at.forEach((e) => (this[e] = membership));
    };
}

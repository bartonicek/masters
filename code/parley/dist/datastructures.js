const baseMembershipArray = [1, 2, 3];
const validMembershipArray = [
    ...baseMembershipArray,
    ...baseMembershipArray.map((e) => e + 128),
    128,
];
const plotTypeArray = ["scatter", "bubble", "bar", "histo", "square"];
export { baseMembershipArray, validMembershipArray, plotTypeArray, };

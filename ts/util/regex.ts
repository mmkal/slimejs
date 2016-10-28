export default function allMatches(input: string, regexp: RegExp) {
    const matches = new Array<RegExpExecArray>();
    let match: RegExpExecArray;
    while (match = regexp.exec(input)) {
        matches.push(match);
    }
    return matches;
}
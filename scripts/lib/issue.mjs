// Issue lines: `Closes #12` right under the marker, one per issue, so the merge closes it.
// The ticket on the series line, or a bare `#12`, only links. A line is an issue line only
// when it holds nothing but closing keywords and references, so a lead such as
// "Fixes #12 for guests" stays the lead. The keyword is case-free, the Jira key is not:
// "Fixes login-2 crash" is prose.

const KW = String.raw`(?:[Cc]lose[sd]?|[Ff]ix(?:e[sd])?|[Rr]esolve[sd]?|[Ii]mplement(?:s|ed)?|[Pp]art of|CLOSES|FIXES|RESOLVES)`;
const REF = String.raw`(?:(?:[\w.-]+(?:\/[\w.-]+)*)?#\d+|[A-Z][A-Z0-9]+-\d+|https?:\/\/\S+?)`;
export const ISSUE = new RegExp(String.raw`^(?:${KW}\s+${REF}(?:\s*,\s*(?:(?:and\s+)?${KW}\s+)?${REF})*|[Nn]o issue)\.?\s*$`);

// Line indexes of the issue block: from line 1 down to the first line that is neither blank
// nor an issue line.
export function issueLines(lines) {
  const at = new Set();
  for (let i = 1; i < lines.length; i++) {
    const s = lines[i].trim();
    if (s === "") continue;
    if (!ISSUE.test(s)) break;
    at.add(i);
  }
  return at;
}

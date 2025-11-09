// Minimalist HTML tagged template `html`
// - Trims leading/trailing blank lines
// - Removes common indentation from all non-empty lines (dedent)
// - Preserves intended indentation for multiline interpolations
// - Trims trailing spaces on each line and collapses excessive blank lines
//
// Inspired by Perl/PHP heredoc ideas (dedenting, removing a common margin)
// while avoiding any heavy HTML parsing — purely line-based and safe for most templating uses.

export default function html(strings, ...values) {
  // Interleave strings and values, preserving/aligning indentation for multiline values.
  const parts = [];
  for (let i = 0; i < strings.length; i++) {
    const before = strings[i];
    parts.push(before);

    if (i < values.length) {
      let v = values[i];
      if (v == null) v = '';
      else v = String(v);

      // If the preceding literal ends with an indentation (last line), use it to indent multiline values.
      const lastLineMatch = before.match(/(^|[\r\n])([ \t]*)$/);
      const indent = lastLineMatch ? lastLineMatch[2] : '';

      if (v.indexOf('\n') !== -1) {
        // Normalize newlines, then prefix each newline in the value with the indent
        v = v.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\n' + indent);
      }
      parts.push(v);
    }
  }

  let combined = parts.join('');

  // Normalize newlines
  combined = combined.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split into lines
  const lines = combined.split('\n');

  // Remove leading blank lines
  while (lines.length && lines[0].trim() === '') lines.shift();

  // Remove trailing blank lines
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  // If nothing left, return empty string
  if (!lines.length) return '';

  // Compute minimum indentation (in characters) among non-empty lines
  const indents = lines
    .filter((l) => l.trim() !== '')
    .map((l) => (l.match(/^[ \t]*/) || [''])[0].length);

  const minIndent = indents.length ? Math.min(...indents) : 0;

  // Remove minIndent whitespace chars from the start of each line, trim trailing spaces
  const dedented = lines.map((l) =>
    l.replace(new RegExp('^[ \\t]{0,' + minIndent + '}'), '').replace(/[ \t]+$/u, '')
  );

  // Collapse 3+ consecutive newlines into 2 newlines (avoid excessive vertical whitespace)
  const result = dedented.join('\n').replace(/\n{3,}/g, '\n\n');

  return result;
}

// // Example usage:
// const formatted = html`      <div>
//   <p>
//     messy formatting and indentaion
//   </p>
// </div>`;

// console.log(formatted);

/* Expected console output:
<div>
  <p>
    messy formatting and indentaion
  </p>
</div>
*/

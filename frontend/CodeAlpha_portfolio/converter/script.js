function convertMarkdown() {
  const value = document.getElementById("markdown-input").value;
  const lines = value.split("\n");
  let result = "";

  lines.forEach(line => {
    let text;

    // Blockquote
    if (/^\s*>\s+/.test(line)) {
      text = line.replace(/^\s*>\s+/, ""); // remove >
    }
    // H1
    else if (/^\s*#\s+/.test(line)) {
      text = line.replace(/^\s*#\s+/, "");
    }
    // H2
    else if (/^\s*##\s+/.test(line)) {
      text = line.replace(/^\s*##\s+/, "");
    }
    // H3
    else if (/^\s*###\s+/.test(line)) {
      text = line.replace(/^\s*###\s+/, "");
    }
    // Normal line
    else {
      text = line;
    }

    // Apply formatting: bold, italic, images, links
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/_(.*?)_/g, "<em>$1</em>");
    text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Wrap headings or blockquotes
    if (/^\s*>\s+/.test(line)) result += `<blockquote>${text}</blockquote>`;
    else if (/^\s*#\s+/.test(line)) result += `<h1>${text}</h1>`;
    else if (/^\s*##\s+/.test(line)) result += `<h2>${text}</h2>`;
    else if (/^\s*###\s+/.test(line)) result += `<h3>${text}</h3>`;
    else result += text;
  });

  return result;
}

// DOM elements
const textarea = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

// Update output and preview on input
textarea.addEventListener("input", function () {
  const result = convertMarkdown();
  htmlOutput.textContent = result;  // show raw HTML
  preview.innerHTML = result;       // render HTML
});

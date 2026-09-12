const pdf = require("pdf-parse");

async function extractResumeText(buffer) {
    const data = await pdf(buffer);
    return data.text;
}

module.exports = extractResumeText;
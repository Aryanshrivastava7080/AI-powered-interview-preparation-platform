const { generateObject, generateText} = require("ai");
const { createGroq } = require("@ai-sdk/groq");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const InterviewSchema = require("../schemas/interview_schema");

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});


// ===============================
// GENERATE INTERVIEW REPORT
// ===============================

async function generateInterviewReport(data) {

    const result = await generateObject({
        model: groq("openai/gpt-oss-20b"),

        schema: InterviewSchema,

        prompt: `
You are an expert technical interviewer.

Analyze the candidate.

Job Description:
${data.jobDescription}

Resume:
${data.resume}

Self Description:
${data.selfDescription}

Generate an interview report.

Requirements:
- technicalQuestions: exactly 5
- behavioralQuestions: exactly 3
- skillGaps: at least 3
- preparationPlan: at least 4 days
- matchScore: between 0 and 100
- Keep answers concise.
`
    });

    console.log("AI structured response:");
    console.log(result.object);

    return result.object;
}


// ===============================
// HTML → PDF
// ===============================

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}


// ===============================
// GENERATE RESUME PDF
// ===============================

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are a professional resume writer.

Create a professional ATS-friendly resume in HTML.

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Requirements:

- Create a complete professional resume.
- Tailor it to the job description.
- Highlight relevant technical skills.
- Highlight relevant projects and experience.
- Do not invent information that is not present in the candidate data.
- Keep the resume concise.
- Keep it suitable for 1-2 pages.
- Make it ATS friendly.
- Use standard HTML elements.
- Use clean CSS.
- Use professional typography.
- Use headings such as Summary, Skills, Experience, Projects, Education when applicable.
- Do not use images.
- Do not use markdown.
- Do not use code fences.
- Do not explain anything.
- Return ONLY the complete HTML document.

Start directly with:
<html>
`;

    const result = await generateText({
        model: groq("openai/gpt-oss-20b"),
        prompt
    });

    console.log("✅ Resume HTML generated");

    let htmlContent = result.text.trim();

    // Sometimes model may still return ```html ... ```
    htmlContent = htmlContent
        .replace(/^```html\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    console.log("HTML length:", htmlContent.length);

    const pdfBuffer = await generatePdfFromHtml(htmlContent);

    console.log("✅ Resume PDF generated");

    return pdfBuffer;
}


module.exports = {
    generateInterviewReport,
    generateResumePdf
};
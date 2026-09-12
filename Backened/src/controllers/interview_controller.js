const { generateInterviewReport, generateResumePdf } = require("../services/ai.services")
const extractResumeText = require("../services/pdf_services")
const interviewReportModel = require("../models/interviewReport.model")




const createInterviewReport = async (req, res) => {
    try {

        const { jobDescription, selfDescription } = req.body;

        // PDF -> Text
        const resumeContent = (await extractResumeText(req.file.buffer)).substring(0,1800);
        
         console.log("Resume Length:", resumeContent.length);
         console.log(resumeContent.substring(0, 500));
        // AI Call
        const reportbyAi = await generateInterviewReport({
            jobDescription,
            resume: resumeContent,
            selfDescription
        });

        console.log("✅ AI REPORT GENERATED");

console.log("User ID:", req.user._id);
console.log("Saving to MongoDB...");

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            ...reportbyAi
        })

        console.log("✅ SAVED:", interviewReport._id);

        res.status(201).json({
            message: "Intervie report generated successfully",
            interviewReport
        })

        //  res.status(200).json({
        //   success: true,
        //     data: reportbyAi
            //  file: req.file
            //   resumeText
        // });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllInterviewReports = async (req, res) => {
    try {

        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            interviewReports
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getInterviewReportById = async (req, res) => {
    try {

        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            success: true,
            interviewReport
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}





module.exports = {
    createInterviewReport,
    getAllInterviewReports,
    getInterviewReportById,
    generateResumePdfController
};
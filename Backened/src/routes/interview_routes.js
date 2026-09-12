const { Router } = require("express");

const interviewController = require("../controllers/interview_controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload_middleware")
const interviewRouter = Router();

/**
 * @route POST /api/interview/generate
 * @description Generate AI Interview Report on the basis of user self description
 * resume pdf,job description
 * @access Private
 */
interviewRouter.post(
    "/generate",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.createInterviewReport
);

interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReports
);

interviewRouter.get(
    "/report/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportById
);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


module.exports = interviewRouter;
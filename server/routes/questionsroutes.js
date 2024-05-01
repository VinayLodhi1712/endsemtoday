const express = require("express");
const router = express.Router();
const {
  AskquestionController,
  UpdatequestionController,
  SearchquestionController,
  QuestionCountController,
  DeletequestionController,
  GetquestionController,
  GetBookMarkedQuestion,
  GetUSerQuestionsController,
  RemoveBookmarked,
  GetSingleQuestionsController,
  QuestionByUserCountController
} = require("../controllers/QuestionControoler");

router.get("/get_question/:Page", GetquestionController);
router.post("/ask_question/:id", AskquestionController);
// router.put("/Update_question/:id", UpdatequestionController);
router.delete("/delete_question/:id", DeletequestionController);
router.get("/UserQuestions/:id/:SkipCount", GetUSerQuestionsController);
router.get("/QuestionCount", QuestionCountController);
router.get("/Question_search/:Keyword", SearchquestionController);
router.get("/getSingleQuestion/:id", GetSingleQuestionsController);
router.get("/getBookmarked/:uid", GetBookMarkedQuestion);

router.get("/AskedUserQuestion/:uid", QuestionByUserCountController);

router.put("/removeBookmarked/:uid/:qid", RemoveBookmarked);
module.exports = router;

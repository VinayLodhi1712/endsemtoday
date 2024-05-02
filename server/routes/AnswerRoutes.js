const express = require("express");
const router = express.Router();
const {
  AnswerController,
  UpdateAnswerController,
  DeleteAnswerController,
  GetAnswerController,
  GetUserAnswerController,
  UpdateAnswerVotesController,
  UpdateAnswerDownVotesController,
  GetUserAnswersController,
  EmailUser,
  // GetAnswerCountByQuestionId,
} = require("../controllers/AnswerController");

router.get("/get_Answer/:qid", GetAnswerController); // answer will be retrieved througth the question id

router.post("/post_Answer/:uid/:qid", AnswerController);

router.put("/Update_Answer/:aid", UpdateAnswerController);

router.delete("/delete_Answer/:aid/:qid/:ansuid", DeleteAnswerController);

router.get("/Get_User_Answers/:uid", GetUserAnswerController);

router.put(
  "/Update_Answer_votes/:aid/:uid/:ansuid",
  UpdateAnswerVotesController
);

router.put(
  "/Update_Answer_Down_votes/:aid/:uid/:ansuid",
  UpdateAnswerDownVotesController
);

router.get("/GetNumberOfQuestions/:uid", GetUserAnswersController);

router.post("/EmailUser/:Email", EmailUser);

// router.get("/GetAnsweCountForQuestion/:qid", GetAnswerCountByQuestionId);

module.exports = router;

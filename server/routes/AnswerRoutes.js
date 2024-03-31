const express = require("express");
const router = express.Router();
const {
  AnswerController,
  UpdateAnswerController,
  DeleteAnswerController,
  GetAnswerController,
  GetUserAnswerController,
  UpdateAnswerVotesController,
} = require("../controllers/AnswerController");

router.get("/get_Answer/:qid", GetAnswerController); // answer will be retrieved througth the question id

router.post("/post_Answer/:uid/:qid", AnswerController);

router.put("/Update_Answer/:aid", UpdateAnswerController);

router.delete("/delete_Answer/:aid", DeleteAnswerController);

router.get("/Get_User_Answers/:uid", GetUserAnswerController);

router.put("/Update_Answer_votes/:aid/:uid", UpdateAnswerVotesController);

module.exports = router;

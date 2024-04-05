const Answermodel = require("../modles/Answermodel");

async function AnswerController(req, resp) {
  try {
    const { Answer, votes } = req.body;
    const response = await new Answermodel({
      questionid: req.params.qid,
      user: req.params.uid,
      answer: Answer,
      votes: votes,
    }).save();

    if (response) {
      resp.status(201).send({
        success: true,
        message: "Answer posted succesfully",
        response,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "Answer was not posted",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "Error in api",
    });
  }
}
async function UpdateAnswerController(req, resp) {
  try {
    const { answer } = req.body;
    const response = await Answermodel.findByIdAndUpdate(
      req.params.aid,
      {
        // questionid: req.params.qid,
        // user: req.params.uid,
        answer: answer,
      },
      { new: true }
    );

    if (response) {
      resp.status(201).send({
        success: true,
        message: "Answer Updated succesfully",
        response,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "Answer was not updated",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "Error in api",
    });
  }
}

async function DeleteAnswerController(req, resp) {
  try {
    const del = await Answermodel.findByIdAndDelete(req.params.aid);
    if (del) {
      resp.status(200).send({
        success: true,
        message: "Deleted Succesfully",
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "Answer Not Deleted ",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "error in api",
    });
  }
}

async function GetAnswerController(req, resp) {
  try {
    const response = await Answermodel.find({
      questionid: req.params.qid,
    }).populate("user", "Name");
    if (response) {
      resp.status(200).send({
        success: true,
        response,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "No answers found",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(400).send({
      success: false,
      message: "error in answers api",
    });
  }
}

async function UpdateAnswerVotesController(req, resp) {
  try {
    const { aid, uid } = req.params;
    const { Votes } = req.body;
    const answer = await Answermodel.findById(aid);

    if (answer.UserWhoVoted.includes(uid)) {
      return resp.status(400).json({
        success: false,
        message: "You have already voted",
      });
    } else {
      answer.votes = Votes;
      answer.UserWhoVoted.push(uid); // push the id of the user who already voted
      await answer.save();
      if (answer) {
        resp.status(201).send({
          success: true,
          message: "Your feedback was added succesfully",
          answer,
        });
      } else {
        resp.status(404).send({
          success: false,
          message: "Error adding feedback ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "Error in api",
    });
  }
}

async function GetUserAnswerController(req, resp) {
  try {
    const answers = await Answermodel.find({ user: req.params.uid }).populate(
      "questionid",
      "title"
    );

    if (answers) {
      resp.status(200).send({
        success: true,
        answers,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "No Answer from this user",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: false,
      message: "Error in api",
    });
  }
}
async function GetUserAnswersController(req, resp) {
  try {
    const AnswersByUser = await Answermodel.find({
      user: req.params.uid,
    }); // give the number of documents by user
    const AnswerCount = AnswersByUser.length;
    resp.status(200).send({
      success: true,
      AnswerCount,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Getting Answers count",
      error,
    });
  }
}

module.exports = {
  AnswerController,
  UpdateAnswerController,
  DeleteAnswerController,
  GetAnswerController,
  GetUserAnswerController,
  UpdateAnswerVotesController,
  GetUserAnswersController,
};

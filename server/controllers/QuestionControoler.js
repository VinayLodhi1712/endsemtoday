const Questionmodel = require("../modles/QuestionModel");
const Answermodel = require("../modles/Answermodel");
const Usermodel = require("../modles/usermodel");
async function AskquestionController(req, resp) {
  try {
    const { question, tags, title } = req.body;
    const user = req.params.id;
    const response = await new Questionmodel({
      question: question,
      user: user,
      tags: tags,
      title: title,
    }).save();
    if (response) {
      resp.status(200).send({
        success: true,
        message: "Question Posted Successfully",
        response,
      });
    } else {
      resp.status(400).send({
        success: true,
        message: "Error Posting question",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(408).send({
      success: true,
      message: "Error in api",
      response,
    });
  }
}

//once the user create the question he cannot update it.

// async function UpdatequestionController(req, resp) {
//   try {
//     const { updatedquestion, tags } = req.body;
//     const questionid = req.params.id;
//     const question = await Questionmodel.findById(questionid); //find the question which already exist to keep some values same
//     const response = await Questionmodel.findByIdAndUpdate(
//       question._id, //find by id
//       {
//         user: question.user, //keep the user id same
//         question: updatedquestion, //update rest fields
//         tags: tags || question.tags,
//       },

//       { new: true }
//     );
//     if (response) {
//       resp.status(200).send({
//         success: true,
//         message: "Question Upadated Successfully",
//         response,
//       });
//     } else {
//       resp.status(304).send({
//         success: true,
//         message: "Error Updating question",
//         response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     resp.status(408).send({
//       success: true,
//       message: "Error updating in api",
//       response,
//     });
//   }
// }

async function DeletequestionController(req, resp) {
  try {
    const deleted = await Questionmodel.findByIdAndDelete(req.params.id);
    const Ansdeleted = await Answermodel.deleteMany({
      questionid: req.params.id,
    });
    if (deleted && Ansdeleted) {
      resp.status(200).send({
        success: true,
        message: "Question deleted Succesfully",
      });
    } else {
      console.log(deleted);
      resp.status(404).send({
        success: false,
        message: "Question not found to delete",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      success: true,
      message: "Error deleting in api",
      response,
    });
  }
}
async function GetquestionController(req, resp) {
  try {
    let SkipCount = req.params.SkipCount;
    const questions = await Questionmodel.find()
      .populate("user", "Name")
      .skip(SkipCount * 6)
      .limit(6)
      .sort({ createdAt: -1 });
    if (questions) {
      resp.status(200).send({
        success: true,
        questions,
      });
    } else {
      resp.status(304).send({
        success: false,
        message: "Not able to get questions",
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
async function GetUSerQuestionsController(req, resp) {
  try {
    let SkipCount = req.params.SkipCount;
    const questions = await Questionmodel.find({ user: req.params.id })
      .populate("user", "Name")
      .sort({ createdAt: -1 })
      .skip(SkipCount * 5)
      .limit(3);
    if (questions) {
      resp.status(200).send({
        success: true,
        questions,
      });
    } else {
      resp.status(304).send({
        success: false,
        message: "Cannot get questions",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      suucess: false,
      message: "Error in api",
    });
  }
}

async function QuestionCountController(req, resp) {
  try {
    const Total = await Questionmodel.find({}).estimatedDocumentCount(); // give the number of documents
    resp.status(200).send({
      success: true,
      Total,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Pagination",
      error,
    });
  }
}

async function QuestionByUserCountController(req, resp) {
  try {
    const QuestionByUser = await Questionmodel.find({
      user: req.params.uid,
    }); // give the number of documents by user
    const questionCount = QuestionByUser.length;
    resp.status(200).send({
      success: true,
      questionCount,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Getting Questions count",
      error,
    });
  }
}

async function GetSingleQuestionsController(req, resp) {
  try {
    const id = req.params.id;
    const question = await Questionmodel.findById(id).populate(
      "user",
      "Name Email"
    );

    if (question) {
      resp.status(200).send({
        success: true,
        question: [question],
      });
    } else {
      resp.status(304).send({
        success: false,
        message: "Cannot get questions",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).send({
      suucess: false,
      message: "Error in api",
    });
  }
}

async function SearchquestionController(req, resp) {
  try {
    const Keyword = req.params.Keyword;
    const questions = await Questionmodel.find({
      $or: [
        { title: { $regex: Keyword, $options: "i" } },
        { tags: { $regex: Keyword, $options: "i" } },
      ],
    }).populate("user");
    if (questions) {
      resp.status(200).send({
        success: true,
        questions,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "No question found",
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
async function GetBookMarkedQuestion(req, resp) {
  try {
    const questions = await Usermodel.findById(req.params.uid)
      .select({ Bookmarked: 1, Name: 1 })
      .populate("Bookmarked");

    if (questions) {
      return resp.status(200).send({
        success: true,
        questions,
      });
    } else {
      return resp.status(400).send({
        suucess: false,
        message: "No Question found",
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(404).send({
      suucess: false,
      message: "Error in api",
    });
  }
}
async function RemoveBookmarked(req, resp) {
  try {
    const { uid, qid } = req.params;
    const user = await Usermodel.findById(uid);
    if (!user) {
      return resp.status(404).json({ error: "User not found" });
    }
    user.Bookmarked.pull(qid);
    await user.save();
    return resp.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return resp.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  AskquestionController,
  GetquestionController,
  // UpdatequestionController,
  SearchquestionController,
  GetBookMarkedQuestion,
  QuestionCountController,
  GetUSerQuestionsController,
  GetSingleQuestionsController,
  DeletequestionController,
  QuestionByUserCountController,
  RemoveBookmarked,
};

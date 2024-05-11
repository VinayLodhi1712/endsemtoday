const Usermodel = require("../modles/usermodel");
const { hashPassword, comparePassword } = require("../helpers/authhelper");
const JWT = require("jsonwebtoken");
const fs = require("fs").promises;
const nodemailer = require("nodemailer");

async function registerController(req, res) {
  try {
    const {
      Name,
      Email,
      Password,
      Answer,
      Location,
      MobileNo,
      SecurityQuestion,
    } = req.fields;

    if (!Name || !Email || !Password || !Location) {
      return res
        .status(400)
        .send({ success: false, error: "All fields are required" });
    }
    const existingUsername = await Usermodel.findOne({ Name });

    const existingEmail = await Usermodel.findOne({ Email });

    const existingNumber = await Usermodel.findOne({ MobileNo });

    if (existingEmail) {
      return res
        .status(409)
        .send({ success: false, message: "Email already exists" });
    } else if (existingUsername) {
      return res
        .status(409)
        .send({ success: false, message: "Username is already taken" });
    } else if (existingNumber) {
      return res
        .status(409)
        .send({ success: false, message: "MobileNo already exists" });
    }

    const hashedPassword = await hashPassword(Password);
    const user = new Usermodel({
      Name,
      Email,
      Password: hashedPassword,
      SecurityQuestion,
      Answer,
      Location,
      MobileNo,
    });

    if (req.files && req.files.photo) {
      user.photo.data = await fs.readFile(req.files.photo.path);
      user.photo.contentType = req.files.photo.type;
      await fs.unlink(req.files.photo.path);
    }

    await user.save();
    res
      .status(201)
      .send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
}

async function loginController(req, resp) {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return resp.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user already exist or not with email

    const user = await Usermodel.findOne({ Email });

    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "user not registered",
      });
    }

    const match = await comparePassword(Password, user.Password);

    if (!match) {
      return resp.status(210).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });
    resp.status(200).send({
      success: true,
      message: "login successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
}

async function ForgotPassword(req, res) {
  try {
    const { Email, Answer, NewPassword } = req.body;
    //check
    const user = await Usermodel.findOne({ Email, Answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email Or Answer",
      });
    }

    const hashed = await hashPassword(NewPassword); //hashing the new password of the user
    await Usermodel.findByIdAndUpdate(user._id, { Password: hashed }); //updating password
    res.status(200).send({
      success: true,
      message: "Password Reset Succesfull Please login",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

async function UpdateProfileController(req, res) {
  try {
    const { Name, Location, Number } = req.fields;
    const { photo } = req.files;

    const user = await Usermodel.findById(req.user._id);

    const existingUser = await Usermodel.findOne({ Number });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists with this number",
      });
    }

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        Name: Name || user.Name,

        Location: Location || user.Location,
        MobileNo: Number || user.MobileNo,
      },
      { new: true }
    );
    if (photo) {
      UpdatedUser.photo.data = await fs.readFile(photo.path);
      UpdatedUser.photo.contentType = photo.type;
    }
    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Succesfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Profile Updatedation",
    });
  }
}
async function UpdateSocialLinksController(req, res) {
  try {
    const { Github, LinkedIn, Website, tags } = req.body;

    const user = await Usermodel.findById(req.user._id);

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        Github: Github,
        LinkedIn: LinkedIn,
        Website: Website,
        $addToSet: {
          tags: { $each: tags }, // Assuming 'tags' is an array of new tag values
        },
      },
      { new: true }
    );
    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Succesfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updatedation",
    });
  }
}
async function UpdateSkillTagsController(req, res) {
  try {
    const { skilltoremove } = req.params;

    const user = await Usermodel.findById(req.user._id);

    user.tags.pull(skilltoremove);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Profile Updated Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updatedation",
    });
  }
}

async function UpdatePasswordController(req, res) {
  try {
    const { OldPassword, NewPassword } = req.fields;

    if (!NewPassword || NewPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Check Password length",
      });
    }
    const user = await Usermodel.findById(req.user._id);

    const match = await comparePassword(OldPassword, user.Password);

    if (!match) {
      return res.status(210).send({
        success: false,
        message: "Invalid  OldPassword",
      });
    }
    const hashedPassword = await hashPassword(NewPassword);

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        Password: hashedPassword,
      },
      { new: true }
    );

    await UpdatedUser.save();

    res.status(200).send({
      success: true,
      message: "Password Updated ",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Profile Updatedation",
      user,
    });
  }
}

async function GetUsersList(req, resp) {
  try {
    const page = req.params.page ? req.params.page : 1;
    const PerPage = 9;
    const AllUsers = await Usermodel.find({ Role: { $ne: 1 } })
      .select("-photo") // do not include admins in the response
      .skip((page - 1) * PerPage) //skip users according to page
      .limit(PerPage)
      .sort({ Reputation: -1 });
    if (AllUsers) {
      resp.status(200).send({
        success: true,
        AllUsers,
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in User Get Api",
      error,
    });
  }
}
async function UserCountController(req, resp) {
  try {
    const Total = await Usermodel.countDocuments({ Role: 0 }); // give the number of documents
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

async function DeleteUser(req, resp) {
  try {
    await Usermodel.findByIdAndDelete(req.params.id);
    resp.status(200).send({
      success: true,
      message: "User Removed Succesfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in deleteing user Api",
      error,
    });
  }
}
async function BookmarkQuestion(req, resp) {
  try {
    const { qid, uid } = req.params;
    const response = await Usermodel.findById(uid);

    if (response.Bookmarked.includes(qid)) {
      return resp.status(400).send({
        success: false,
        message: "Already Bookmarked",
      });
    } else {
      response.Bookmarked.push(qid);
      await response.save();
      if (response) {
        return resp.status(200).send({
          success: true,
          message: "BookMarked Succesfull",
        });
      } else {
        return resp.status(404).send({
          success: false,
          message: "Question not bookmarked",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: true,
      message: "Error in api",
    });
  }
}

async function GetUserPhotoController(req, resp) {
  try {
    const user = await Usermodel.findById(req.params.id).select("photo");
    if (user.photo.data) {
      resp.set("Content-type", user.photo.contentType);
    }
    return resp.status(200).send(user.photo.data);
  } catch (error) {
    resp.status(404).send({
      success: false,
      message: "Error getting Product",
      error,
    });
  }
}

async function SubmitUserQuery(req, resp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taskmaster991@gmail.com",
      pass: "kmepakzcabvztekd",
    },
  });

  const mailOptions = {
    from: req.body.Email,
    to: "taskmaster991@gmail.com",
    subject: "TALKOFCODE USER QUERY",
    text: `
      Name: ${req.body.Name}
      Email: ${req.body.Email}
      Message: ${req.body.Message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      resp.status(200).send("Form data sent successfully");
    }
  });
}

async function getTotalUsersController(req, resp) {
  try {
    const totalUsers = await Usermodel.countDocuments({ Role: { $ne: 1 } });

    resp.status(200).send({
      success: true,
      totalUsers,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error getting total users",
      error,
    });
  }
}
async function GetUserReputation(req, resp) {
  try {
    const uid = req.params.uid;
    const Rep = await Usermodel.findById(uid).select("Reputation");
    resp.status(200).send({
      success: true,
      Rep,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Repuataion error",
      error,
    });
  }
}
async function GetSingleUserInfo(req, resp) {
  try {
    const uid = req.params.uid;
    const user = await Usermodel.findById(uid).select("-photo");
    if (user) {
      resp.status(200).send({
        success: true,
        user,
      });
    } else {
      resp.status(400).send({
        success: false,
        message: "Cannot get user try again",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: " user error",
      error,
    });
  }
}

async function ResetPasswordEmail(req, resp) {
  const { UserEmail } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taskmaster991@gmail.com",
      pass: "kmepakzcabvztekd",
    },
  });

  const mailOptions = {
    from: "taskmaster991@gmail.com",
    to: UserEmail,
    subject: "Reset password",
    html: `
    <p>Reset your password from the link .</p>
    <a href="https://talkofcode.vercel.app/Resetbyemail/${UserEmail}"><button>Click here</button></a> to reset password`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      resp.status(200).send("Form data sent successfully");
    }
  });
}

async function ResetPasswordDirectly(req, resp) {
  try {
    const Email = req.params.Email;

    const { NewPassword } = req.body;
    const hashPass = await hashPassword(NewPassword);
    const user = await Usermodel.findOneAndUpdate(
      { Email: Email },
      { Password: hashPass },
      { new: true }
    ).select("-photo");
    if (user) {
      resp.status(200).send({
        message: "Password reset succesfull",
        user,
      });
    } else {
      resp.status(404).send({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "Error in api",
    });
  }
}

module.exports = {
  registerController,
  loginController,
  ForgotPassword,
  UpdateProfileController,
  GetUsersList,
  DeleteUser,
  UserCountController,
  BookmarkQuestion,
  GetUserPhotoController,
  SubmitUserQuery,
  getTotalUsersController,
  UpdateSocialLinksController,
  UpdatePasswordController,
  GetUserReputation,
  UpdateSkillTagsController,
  ResetPasswordEmail,
  GetSingleUserInfo,
  ResetPasswordDirectly,
};

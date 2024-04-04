const Usermodel = require("../modles/usermodel");
const Ordermodel = require("../modles/OrderModel");
const { hashPassword, comparePassword } = require("../helpers/authhelper");
const JWT = require("jsonwebtoken");
const fs = require("fs").promises;

async function registerController(req, res) {
  try {
    const { Name, Email, Password, Answer, Address, MobileNo } = req.fields;

    if (!Name || !Email || !Password || !Address) {
      return res
        .status(400)
        .send({ success: false, error: "All fields are required" });
    }

    const existingUser = await Usermodel.findOne({
      $or: [{ Email }, { MobileNo }],
    });
    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(Password);
    const user = new Usermodel({
      Name,
      Email,
      Password: hashedPassword,
      Answer,
      Address,
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
    const { Name, Password, Address, Number } = req.fields;
    const { photo } = req.files;
    if (!Password || Password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Check Password length",
      });
    }
    const user = await Usermodel.findById(req.user._id);
    console.log(user);
    const hashedPassword = await hashPassword(Password);

    const existingUser = await Usermodel.findOne({ Number });

    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, message: "User already exists" });
    }

    const UpdatedUser = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        Name: Name || user.Name,
        Password: hashedPassword || user.Password,
        Address: Address || user.Address,
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
      user,
    });
  }
}

async function GetAllOrderController(req, resp) {
  try {
    const orders = await Ordermodel.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "Name"); //populate the buyer only with name
    resp.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error getting Orders",
      error,
    });
  }
}
async function GetAllAdminOrderController(req, resp) {
  try {
    const orders = await Ordermodel.find({})
      .populate("products", "-photo")
      .populate("buyer", "Name")
      .sort({ createdAt: -1 });
    resp.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error getting Orders",
      error,
    });
  }
}

async function UpdateOrderStatus(req, resp) {
  try {
    const id = req.params.id; //orderid
    const NewOrderStatus = req.body.status; // new status
    const Response = await Ordermodel.findByIdAndUpdate(
      id,
      {
        status: NewOrderStatus,
      },
      { new: true }
    );
    resp.status(200).send({
      success: true,
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error Updating Status",
      error,
    });
  }
}
async function CancelOrder(req, resp) {
  try {
    await Ordermodel.findByIdAndDelete(req.params.id);
    resp.status(200).send({
      success: true,
      message: "Deleted Succesfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error in Deletion",
    });
  }
}
async function GetUsersList(req, resp) {
  try {
    const page = req.params.page ? req.params.page : 1;
    const PerPage = 5;
    const AllUsers = await Usermodel.find({ Role: { $ne: 1 } }) // do not include admins in the response
      .skip((page - 1) * PerPage) //skip users according to page
      .limit(PerPage)
      .sort({ createdAt: -1 });
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

module.exports = {
  registerController,
  loginController,
  ForgotPassword,
  UpdateProfileController,
  GetAllOrderController,
  GetAllAdminOrderController,
  UpdateOrderStatus,
  CancelOrder,
  GetUsersList,
  DeleteUser,
  UserCountController,
  BookmarkQuestion,
  GetUserPhotoController,
};

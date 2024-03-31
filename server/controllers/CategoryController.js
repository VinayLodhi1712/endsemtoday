const CategoryModel = require("../modles/CategoryModel");
const slugify = require("slugify");

//create category
async function CreateCategoryController(req, resp) {
  try {
    const { name } = req.body;

    if (!name) {
      return resp.status(404).send({
        success: false,
        message: "Provide valid Name ",
      });
    }
    const ExistingCategory = await CategoryModel.findOne({ name });
    if (ExistingCategory) {
      return resp.status(201).send({
        success: false,
        message: "Category Already Exists",
      });
    }
    const NewCategory = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    resp.status(200).send({
      success: true,
      message: `${name} Category Created Succesfully`,
      NewCategory,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
}

//update category

async function UpdateCategoryController(req, resp) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      throw new Error("Invalid or missing name");
    }
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    resp.status(200).send({
      success: true,
      message: "Category Updated succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in Category Updation",
      error,
    });
  }
}

//get all category

async function GetAllCategoryController(req, resp) {
  try {
    const category = await CategoryModel.find({});
    resp.status(200).send({
      success: true,
      Message: "All categories",
      category,
    });
  } catch (error) {
    resp.status(500).send({
      Success: false,
      message: "Error Showing Category ",
      error,
    });
  }
}

//get single category controller
async function GetSingleCategoryController(req, resp) {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    resp.status(200).send({
      success: true,
      Message: "got Single categories",
      category,
    });
  } catch (error) {
    resp.status(500).send({
      Success: false,
      message: "Error Showing single Category ",
      error,
    });
  }
}

//delete category

async function DeleteCategoryController(req, res) {
  try {
    const { id } = req.params;
    const DelCategory = await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      DelCategory,
    });
  } catch (error) {
    resizeBy.status(404).send({
      success: false,
      Message: "Error deleting Category",
      error,
    });
  }
}

module.exports = {
  CreateCategoryController,
  UpdateCategoryController,
  GetAllCategoryController,
  GetSingleCategoryController,
  DeleteCategoryController,
};

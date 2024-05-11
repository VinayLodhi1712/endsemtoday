import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Usecategory = () => {
  const [AllCat, SetAllCat] = useState([]);
  //get cat
  async function getCatagories() {
    try {
      const response = await fetch(
        "https://talkofcodebackend.onrender.com/api/v1/category/GetAll-category"
      );
      if (response) {
        const data = await response.json();
        SetAllCat(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Showing Categories");
    }
  }

  useEffect(() => {
    getCatagories();
  }, []);

  return AllCat; // we can get Allcat in any file after importing the Usecategory function
};
export default Usecategory;

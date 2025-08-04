import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

const Usecategory = () => {
  const [AllCat, SetAllCat] = useState([]);
  //get cat
  async function getCatagories() {
    try {
      const response = await fetch(
        "${API_BASE_URL}/category/GetAll-category"
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




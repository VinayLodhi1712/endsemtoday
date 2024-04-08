import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./user/dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/routes/privateroute";
import Forgotpassword from "./pages/forgotpassword";
import AdminRoute from "./components/routes/Adminroute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CeateProduct";
import Orders from "./user/orders";
import Profile from "./user/Profile";
import Products from "./pages/Admin/products";
import UpdateProduct from "./pages/Admin/updateproduct";
import Search from "./Search";
import ProductDetails from "./pages/ProductDetails";
import Categorylist from "./pages/categorylist";
import CartPage from "./pages/CartPage";
import Adminorder from "./pages/Admin/Adminorder";
import AdminProfile from "./pages/Admin/AdminProfile";
import Users from "./pages/Admin/User";
import CreateProductUSer from "./user/usercreateproduct";
import UpdateProducts from "./user/productsuser";
import UpateProductUSer from "./user/updateproductuser";
import Interaction from "./pages/Interaction";
import AskQuestion from "./pages/AskQuestion";
import UserQuestions from "./pages/UserQuestions";
import AnswerQuestion from "./pages/AnswerQuestion";
import UserContributions from "./pages/UserContributions";
import View from "./pages/View";
import AdminQuestions from "./pages/Admin/AdminQuestion";
import AdminContributions from "./pages/Admin/AdminContributions";
import Productpage from "./pages/Productpage";
import Technews from "./pages/Technews";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/ProductDetails/:slug"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/UserCart" element={<CartPage></CartPage>}></Route>
        <Route path="/products" element={<Productpage></Productpage>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/categories/:id" element={<Categorylist />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/ContactUs" element={<Contact />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/ForgotPassword" element={<Forgotpassword />}></Route>
        <Route
          path="/Dashboard/user/interaction"
          element={<Interaction />}
        ></Route>
        <Route path="/technews" element={<Technews/>}></Route>
        {/* users */}

        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/orders" element={<Orders />}></Route>
          <Route path="user/Profile" element={<Profile />}></Route>
          {/* question */}

          <Route path="user/Ask" element={<AskQuestion />}></Route>
          <Route path="user/questions" element={<UserQuestions />}></Route>
          <Route path="user/answers/:id" element={<AnswerQuestion />}></Route>
          <Route
            path="user/Contributions"
            element={<UserContributions />}
          ></Route>
          <Route path="user/ViewQuestion/:qid" element={<View />}></Route>

          <Route
            path="user/Create-Product"
            element={<CreateProductUSer></CreateProductUSer>}
          ></Route>
          <Route
            path="user/Product"
            element={<UpdateProducts></UpdateProducts>}
          ></Route>
          <Route
            path="user/Update-Product/:slug"
            element={<UpateProductUSer />}
          ></Route>
        </Route>

        {/* admin */}

        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/Create-Product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path="admin/Create-Category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/Update-Product/:slug"
            element={<UpdateProduct />}
          ></Route>

          <Route path="admin/Product" element={<Products></Products>}></Route>

          <Route
            path="Admin/Orders"
            element={<Adminorder></Adminorder>}
          ></Route>
          <Route path="Admin/Profile" element={<AdminProfile />}></Route>
          <Route path="Admin/Users" element={<Users />}></Route>

          <Route path="Admin/Interaction" element={<Interaction />}></Route>

          <Route path="admin/Ask" element={<AskQuestion />}></Route>
          <Route path="admin/questions" element={<AdminQuestions />}></Route>
          <Route path="admin/answers/:id" element={<AnswerQuestion />}></Route>
          <Route
            path="admin/Contributions"
            element={<AdminContributions />}
          ></Route>
          <Route path="admin/ViewQuestion/:qid" element={<View />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

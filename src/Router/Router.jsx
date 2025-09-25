import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../Pages/Login";
import Register from "../components/Register";
import Logout from "../Pages/Logout";
import Categories from "../Pages/Categories";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsOfService from "../Pages/Terms";
import Contact from "../Pages/Contact";
import Error from "../Pages/Error";
import ProductDetails from "../Pages/ProductDetails";
import LoadingSpinner from "../components/LoadingSpinner";
import AddProducts from "../Pages/AddProducts";
import PrivateRoute from "../context/PrivateRoute";
import Cart from "../Pages/Cart";
import Product from "../components/Product";
import ProductPage from "../Pages/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children : [
        {
            index: true,
            Component:Home
        },
        {
          path:"login",
          Component: Login
        },
        {
          path:"register",
          Component: Register
        },
        {
          path:"logout",
          Component: Logout
        },
        {
          path:"categories",
          loader : ()=> fetch("http://localhost:3000/category"),
          HydrateFallback : LoadingSpinner,
          Component: Categories
        },
        {
          path:"allProducts",
          loader : ()=> fetch("http://localhost:3000"),
          HydrateFallback : LoadingSpinner,
          element: <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        },
        {
          path:"addproducts",
          loader : ()=> fetch("http://localhost:3000/category"),
          HydrateFallback : LoadingSpinner,
          element: <PrivateRoute>
            <AddProducts></AddProducts>
          </PrivateRoute>
        },
        {
          path:"myproduct",
          element: <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        },
        {
          path:"cart",
          element: <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        }
        ,
        {
          path:"privacy",
          Component: PrivacyPolicy
        },
        {
          path:"terms",
          Component: TermsOfService
        },
        {
          path:"contact",
          Component: Contact
        },
        {
          path:"category/:slug",
          element: <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        },
        {
          path:"product/:id",
          element: <PrivateRoute>
            <ProductPage></ProductPage>
          </PrivateRoute>
        }
    ]
  },
  {
    path:"*",
    Component:Error
  }
]);
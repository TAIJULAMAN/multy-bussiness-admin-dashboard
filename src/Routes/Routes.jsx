import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import UsersManage from "../pages/User/UsersManage";
import EarningPage from "../pages/Earning/EarningPage";
import VerificationCode from "../pages/Auth/Otp";
import ListingsTab from "../pages/Listings/Listings";
import Categories from "../pages/Categories/Categories";
import Profile from "../pages/Profile/Profile";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition/TermsCondition";
import Faq from "../pages/Faq/Faq";
import BusinessInfo from "../pages/Categories/BussinessInfo";
import AddFormation from "../pages/Categories/AddFormation";
import MainSubscriptionPage from "../pages/Subscription/MainSubscriptionPage";
import NDA from "../pages/NDA/NDA";
import DocumentPage from "../pages/NDA/DocumentPage";
import Coupon from "../pages/Coupon/Coupon";
import AllSubscriber from "../pages/AllSubscriber/AllSubscriber";
import EditListing from "../pages/Listings/EditListing";
import Formation from "../pages/formation/Formation";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/user-management",
        element: <UsersManage />,
      },
      {
        path: "/listing-management",
        element: <ListingsTab />,
      },
      {
        path: "/edit-listing-management",
        element: <EditListing />,
      },
      {
        path: "/subscription",
        element: <MainSubscriptionPage />,
      },
      {
        path: "/all-subscriber",
        element: <AllSubscriber />,
      },
      {
        path: "/earnings-management",
        element: <EarningPage />,
      },
      {
        path: "/categories",
        element: <Formation />,
      },
      {
        path: "/categories/:id",
        element: <BusinessInfo />,
      },
      {
        path: "/categories/add",
        element: <AddFormation />,
      },

      {
        path: "/NDA",
        element: <NDA />,
      },
      {
        path: "/document",
        element: <DocumentPage />,
      },
      {
        path: "/coupon",
        element: <Coupon />,
      },

      {
        path: "/terms-condition",
        element: <TermsCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/faq-management",
        element: <Faq />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <VerificationCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
]);

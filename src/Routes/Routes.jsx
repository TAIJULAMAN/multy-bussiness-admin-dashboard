import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import ForgetPassword from "../pages/Auth/ForgetPassword"
import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../Layout/Dashboard';
import DashboardHome from '../pages/DashboardHome/DashboardHome';
import UsersManage from '../pages/User/UsersManage';
import EarningPage from '../pages/Earning/EarningPage';
import VerificationCode from '../pages/Auth/Otp';
import ListingsTab from '../pages/Listings/Listings';
import Subscription from '../pages/Subscription/Subscription';
import Categories from '../pages/Categories/Categories';
import Location from '../pages/Locations/Locations';
import Profile from '../pages/Profile/Profile';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsCondition from '../pages/TermsCondition/TermsCondition';
import Faq from '../pages/Faq/Faq';
import BusinessInfo from '../pages/Categories/BussinessInfo';


export const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardHome />,
      },
      {
        path: '/user-management',
        element: <UsersManage />,
      },
      {
        path: '/listing-management',
        element: <ListingsTab />,
      },
      {
        path: '/subscription',
        element: <Subscription />,
      },
      {
        path: '/earnings-management',
        element: <EarningPage />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/categories/:id',
        element: <BusinessInfo />,
      },
      {
        path: 'locations',
        element: <Location />,
      },

      {
        path: '/terms-condition',
        element: <TermsCondition />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/faq-management',
        element: <Faq />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/otp',
    element: <VerificationCode />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
  },
]);

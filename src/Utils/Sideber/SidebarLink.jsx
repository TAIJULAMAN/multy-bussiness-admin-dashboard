import React from "react";
import { BiCategory } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { LuChartNoAxesCombined, LuClipboardList, LuCrown } from "react-icons/lu";
import { PiMapPinArea } from "react-icons/pi";
import { RiCoupon4Line, RiDashboard2Line, RiUserSettingsLine } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";

export const SidebarLink = [
  {
    path: "/",
    label: "Dashboard",
    icon: <RiDashboard2Line size={24} />,
  },
  {
    path: "/user-management",
    label: "User",
    icon: <FaRegUserCircle size={24} />,
  },
  {
    path: "/listing-management",
    label: "Listings",
    icon: <LuClipboardList size={24} />,
  },
  {
    path: "/subscription",
    label: "Subscription ",
    icon: <LuCrown size={24} />,
  },
  {
    path: "/all-subscriber",
    label: "All Subscriber",
    icon: <FaListUl size={24} />,
  },
  {
    path: "/earnings-management",
    label: "Earnings",
    icon: <LuChartNoAxesCombined size={24} />,
  },
  {
    path: "/NDA",
    label: "NDA",
    icon: <PiMapPinArea size={24} />,
  },
  {
    path: "/coupon",
    label: "Coupon",
    icon: <RiCoupon4Line size={24} />,
  },
  {
    path: "/categories",
    label: "Formation",
    icon: <BiCategory size={24} />,
  },
  {
    path: "/profile",
    label: "Profile Setting",
    icon: <RiUserSettingsLine size={24} />,
  },
  {
    path: "/faq-management",
    label: "FAQ",
    icon: <TbMessageQuestion size={24} />,
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    icon: <GoChecklist size={24} />,
  },
  {
    path: "/terms-condition",
    label: "Terms & Condition",
    icon: <CiCircleQuestion size={24} />,
  }
];
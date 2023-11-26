import { Business, RollerShades } from "@mui/icons-material";

import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { SubNavItem } from "@layouts/dashboard/SubNav";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

export const SideBarRouteAdmin: SubNavItem[] = [
  {
    href: "/",
    icon: <SignalCellularAltIcon />,
    title: "Tổng quan",
  },
  {
    href: "/user",
    icon: <GroupIcon fontSize="small" />,
    title: "Quản lý tài khoản",
  },
  {
    href: "/role",
    icon: <RollerShades fontSize="small" />,
    title: "Quản lý vai trò",
  },
  {
    href: "/supplier",
    icon: <MapsHomeWorkIcon fontSize="small" />,
    title: "Quản lý nhà cung cấp",
  },
  {
    href: "/topping",
    icon: <ColorLensIcon fontSize="small" />,
    title: "Quản lý topping",
  },
  {
    href: "/category",
    icon: <CategoryIcon fontSize="small" />,
    title: "Quản lý loại sản phẩm",
  },
  {
    href: "/product",
    icon: <FastfoodIcon fontSize="small" />,
    title: "Quản lý sản phẩm",
  },
  {
    href: "/order",
    icon: <InventoryIcon fontSize="small" />,
    title: "Quản lý đơn hàng",
  },
  {
    href: "/statistic",
    icon: <TroubleshootIcon fontSize="small" />,
    title: "Báo cáo thống kê",
  },
];

export const SideBarRouteSaler: SubNavItem[] = [
  {
    href: "/color",
    icon: <ColorLensIcon fontSize="small" />,
    title: "Quản lý màu",
  },
  {
    href: "/category",
    icon: <CategoryIcon fontSize="small" />,
    title: "Quản lý loại sản phẩm",
  },
  {
    href: "/product",
    icon: <FastfoodIcon fontSize="small" />,
    title: "Quản lý sản phẩm",
  },
  {
    href: "/supplier",
    icon: <MapsHomeWorkIcon fontSize="small" />,
    title: "Quản lý nhà cung cấp",
  },
];

import { SubNavItem } from "@layouts/dashboard/SubNav";
import { RollerShades } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

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
    href: "/package",
    icon: <InventoryIcon fontSize="small" />,
    title: "Quản lý đơn hàng",
  },
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
    href: "/suplier",
    icon: <MapsHomeWorkIcon fontSize="small" />,
    title: "Quản lý nhà cung cấp",
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
    href: "/suplier",
    icon: <MapsHomeWorkIcon fontSize="small" />,
    title: "Quản lý nhà cung cấp",
  },
];

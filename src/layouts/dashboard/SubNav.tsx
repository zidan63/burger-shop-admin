import useDidUpdate from "@hooks/useDidUpdate";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CollapseLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Box, Button, Divider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export type SubNavItem = {
  href?: string;
  icon: JSX.Element;
  expandIcon?: JSX.Element;
  title: string;
  subNav?: Partial<SubNavItem>[];
};

interface Props {
  item: SubNavItem;
  open: any;
  sx?: any;
  isChild?: boolean;
  setOpenSidebar?: (value: boolean) => void;
  onClick?: () => void;
}
const isActive = (href?: string, pathname?: any) => {
  return href === "/" ? pathname === href : pathname?.startsWith(href);
};

export const SubNav: React.FC<Props> = ({
  sx,
  item,
  open,
  isChild,
  setOpenSidebar = () => {},
  onClick = () => {},
}) => {
  const [showNav, setShowNav] = useState(false);
  const route = useRouter();
  const pathname = usePathname();
  const active = isActive(item.href, pathname);

  const handleClick = () => {
    if (!item.href) onClick();
    else if (!item.subNav && item.href) route.push(item.href);
    else {
      setShowNav((prev) => !prev);
      if (!open) setOpenSidebar(true);
    }
  };

  useDidUpdate(() => {
    if (!open) setShowNav(false);
  }, [open]);

  return (
    <Box
      sx={{
        position: "relative",
        background: showNav ? "rgba(0,0,0,0.2)" : "transparent",
        borderRadius: "6px",
        transition: "all .15s ease",
        ...sx,
      }}
    >
      <Button
        onClick={handleClick}
        disableRipple
        sx={{
          borderRadius: "6px",
          display: "flex",
          alignitems: "center",
          justifyContent: "space-between",
          color: active ? "#FFE299" : "#FFFFFF",
          backgroundColor: active ? "rgba(0,0,0, 0.5) !important" : "transparent",
          fontWeight: active ? "600" : "500",
          // height: !isChild ? "50px" : "fit-content",
          height: "50px",
          minWidth: "0",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          transition: "all .15s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
          },
        }}
      >
        {open && !isChild ? item.expandIcon || item.icon : !isChild && item.icon}
        {(open || isChild) && <TitleButton title={item.title} isChild={isChild} />}
        {item?.subNav && <ArrowIcon open={open} isShow={showNav} />}
      </Button>
      <Box
        sx={{
          display: "flex",
          transition: "max-height .3s ease",
          overflow: "hidden",
          maxHeight: showNav ? "400px" : "0px",
          pl: "14px",
        }}
      >
        <Box sx={{ pb: "33px" }}>
          <Box sx={{ height: "100%", borderLeft: "2px dashed #fff" }} />
        </Box>
        <Box sx={{ pr: 1, transition: "all .15s ease", flex: 1 }}>
          {item?.subNav?.map((item: any, index: any) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                my: 1,
              }}
            >
              <Box
                sx={{
                  ml: "4px",
                  width: "10px",
                  borderBottom: "2px dashed #fff",
                }}
              />
              <SubNav open={open} item={item} isChild={true} sx={{ flex: 1 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const ArrowIcon = ({ open, isShow }) => {
  if (!open)
    return (
      <ArrowDropDownIcon
        sx={{
          transform: `translateX(-50%) ${isShow ? "translateY(4px)" : "translateY(0)"}`,
          transition: "transform 0.15s ease",
          position: "absolute",
          left: "50%",
          bottom: 0,
        }}
      />
    );
  return (
    <ArrowDropDownIcon
      sx={{
        transform: isShow ? "rotate(-180deg)" : "rotate(0)",
        transition: "transform 0.15s ease",
        position: "relative",
      }}
    />
  );
};

const TitleButton = ({ title, isChild }) => {
  return (
    <Box
      sx={{
        textWrap: "no-wrap",
        overflow: "hidden",
        flexGrow: 1,
        flex: 1,
        ml: isChild ? 0 : 1.5,
        minWidth: "max-content",
        textAlign: "left",
        opacity: "1",
        visibility: "visible",
        fontSize: isChild ? 13 : 14,
        transition: "opacity .3s ease, visibility .3s ease",
      }}
    >
      {title}
    </Box>
  );
};

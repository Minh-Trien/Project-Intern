import { Tag, Mail, Notifications, ImportantDevices } from "@mui/icons-material";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Avatar,
  Menu,
  Badge,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import "../assets/newsFeed.css"
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
 
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: "25px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
   <></>
  );
};

export default Navbar;
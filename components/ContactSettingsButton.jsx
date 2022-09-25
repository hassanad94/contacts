import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";

const StyledMenuItem = styled(MenuItem)({
  "&": {
    color: "white",
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    lineHeight: "20px",
  },
  "&:hover": {
    background: "#232323",
  },
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    background: "#1E1E1E",
  },
  "& ul": {
    width: "200px",
  },
});

export default function ContactSettingsButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="w-[40px] mr-[20px] h-[40px] rounded-[8px] bg-[#1E1E1E] hover:bg-[#1565c0]"
      >
        <Image width={36} height={6} alt="dots" src="/img/dots.svg" />
      </Button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Image width={15} alt="edit" height={15} src="/img/edit.svg" />
          </ListItemIcon>
          Edit
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Image width={15} alt="fav" height={15} src="/img/fav.svg" />
          </ListItemIcon>
          Favorite
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Image width={15} alt="remove" height={15} src="/img/del.svg" />
          </ListItemIcon>
          Remove
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

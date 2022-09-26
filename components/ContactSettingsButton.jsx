import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useStateContext } from "../context/settingContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 360,
  minHeight: 470,
  bgcolor: "#141414",
  boxShadow: 0,
  padding: "24px",
  outline: 0,
  borderRadius: "8px",
  cursor: "auto",
  width: "100%",
};

const StyledMenuItem = styled(MenuItem)({
  "&": {
    color: "white",
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    lineHeight: "20px",
    overflow: "auto",
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

export default function ContactSettingsButton({ personID }) {
  const handleFormUploadResponse = async (data) => {
    const { status } = data.data;
    if (!status) {
      return false;
    }

    const allContactAPIRoute = "http://localhost:3000/api/contacts/getAll";

    const contactList = await (
      await fetch(allContactAPIRoute, { method: "POST" })
    ).json();

    setContacts(contactList);

    setAnchorEl(null);
  };

  const { setEditModal, editModal } = useStateContext();
  const handleModalOpen = () => setEditModal(true);
  const handleModalClose = () => setEditModal(false);

  const [personUnderHandleID, setPersonUnderHandleID] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPersonUnderHandleID(
      event.currentTarget.attributes["data-person-id"].value
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
    setPersonUnderHandleID(null);
  };

  const handleDelete = async (event) => {
    const response = await fetch("/api/contacts/delete", {
      method: "POST",
      body: JSON.stringify({ contactID: personUnderHandleID }),
    })
      .then((r) => r.json())
      .then((data) => {
        handleFormUploadResponse(data);
      });
  };

  const handleEdit = () => {
    handleModalOpen();
    setAnchorEl(null);
  };

  return (
    <>
      <Modal
        className="cursor-pointer bg-[transparent] shadow-none p-[15px]"
        open={editModal}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <Form personID={personID} title="Edit Contact" />
        </Box>
      </Modal>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-person-id={personID}
        className="w-[40px] mr-[20px] h-[40px] rounded-[8px] bg-[#1E1E1E] hover:bg-[#1565c0]"
      >
        <Image width={36} height={6} alt="dots" src="/img/dots.svg" />
      </Button>
      <StyledMenu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <StyledMenuItem onClick={handleEdit}>
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
        <StyledMenuItem
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          <ListItemIcon>
            <Image width={15} alt="remove" height={15} src="/img/del.svg" />
          </ListItemIcon>
          Remove
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

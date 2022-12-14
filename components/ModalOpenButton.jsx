import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 360,
  bgcolor: "#141414",
  boxShadow: 0,
  padding: "24px",
  outline: 0,
  borderRadius: "8px",
  cursor: "auto",
  width: "100%",
};

const ModalOpenButton = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div
        onClick={handleOpen}
        className=" add-new button button-gradrient w-[120px] rounded-full p-[8px_16px_8px_12px] hover:bg-[#1565c0]"
      >
        <span className="text-[18px] mr-[6px] md:mr-[8px]">+</span> {title}
      </div>

      <Modal
        className="cursor-pointer shadow-none p-[15px]"
        open={openModal}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Form modalSetting={setOpenModal} title="Add Contact" />
        </Box>
      </Modal>
    </>
  );
};

export default ModalOpenButton;

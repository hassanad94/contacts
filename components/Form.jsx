import { useRef, useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useStateContext } from "../context/settingContext";
import Alert from "@mui/material/Alert";

const CssTextField = styled(TextField)({
  "&": {
    width: "100%",
  },
  "& .MuiInputBase-input": {
    color: "rgba(255, 255, 255, 0.32)",
    outline: "0!important",
    width: "100%",
  },
  "& label": {
    color: "rgba(255, 255, 255, 0.32)",
  },
  "& label.Mui-focused": {
    color: "rgba(255, 255, 255, 0.32)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#282828",
    },
    "&:hover fieldset": {
      borderColor: "#282828",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1565c0",
    },
  },
});

const initPreviewImageURL = "/img/empty-profile.png";

const Form = () => {
  const { setContacts } = useStateContext();

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

    setOpenModal(false);
  };
  const fileInput = useRef();
  const { setOpenModal } = useStateContext();

  const [uploadImgURL, setUploadImgURL] = useState(initPreviewImageURL);
  const [showImageError, setShowImageError] = useState(false);

  const [formFieldsValues, setformFieldsValues] = useState({
    name: "",
    phone: "",
    email: "",
    image: {},
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (uploadImgURL === initPreviewImageURL) {
      setShowImageError(true);

      return;
    }

    var data = new FormData();

    for (const key in formFieldsValues) {
      if (!Object.hasOwnProperty.call(formFieldsValues, key)) {
        continue;
      }

      let value = formFieldsValues[key];

      data.append(key, value);
    }

    const response = await fetch("/api/contacts/add", {
      method: "POST",
      body: data,
    })
      .then((r) => r.json())
      .then((data) => handleFormUploadResponse(data));
  };

  return (
    <form id="uploadForm" onSubmit={(e) => handleOnSubmit(e)}>
      <div className="input-container mb-[20px] image-upload-container flex items-center">
        <Image
          src={uploadImgURL}
          className="rounded-full object-cover mr-[15px]"
          width={88}
          height={88}
          id=""
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInput.current.click()}
          className="flex flex-row align-center ml-[15px] p-[8px_16px_8px_12px] inline-block bg-[#2D2D2D] rounded-[8px]"
        >
          <span className="text-[18px] mr-[6px] md:mr-[8px]">+</span> Add
          picture
        </Button>

        <input
          ref={fileInput}
          type="file"
          name="profileImage"
          id="imageUpload"
          value={""}
          className="hidden"
          onChange={() => {
            setformFieldsValues((prev) => ({
              ...prev,
              image: fileInput.current.files[0],
            }));

            if (showImageError) {
              setShowImageError(false);
            }

            setUploadImgURL(
              window.URL.createObjectURL(fileInput.current.files[0])
            );
          }}
        />
      </div>
      {showImageError && (
        <Alert
          variant="filled"
          className="mb-[20px] flex items-center"
          severity="error"
        >
          Please upload an Image
        </Alert>
      )}

      <div className="input-container mb-[20px]">
        <CssTextField
          value={formFieldsValues.name}
          onChange={(e) => {
            setformFieldsValues((prev) => ({ ...prev, name: e.target.value }));
          }}
          name="name"
          label="Name"
          autoComplete="none"
          required
        />
      </div>

      <div className="input-container mb-[20px]">
        <CssTextField
          value={formFieldsValues.phone}
          onChange={(e) => {
            setformFieldsValues((prev) => ({ ...prev, phone: e.target.value }));
          }}
          name="phone"
          label="Phone"
          autoComplete="none"
          pattern="[0-9]+"
          title="format: 36705459875"
          required
        />
      </div>

      <div className="input-container mb-[20px]">
        <CssTextField
          value={formFieldsValues.email}
          onChange={(e) => {
            setformFieldsValues((prev) => ({ ...prev, email: e.target.value }));
          }}
          label="Email"
          type="email"
          name="email"
          autoComplete="none"
          required
        />
      </div>

      <div className="actions-container flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenModal(false);
          }}
          className="text-[#fff] p-[8px_16px] mr-[20px] rounded-[8px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-[#fff] p-[8px_16px] bg-[#262626] rounded-[8px]"
        >
          Done
        </button>
      </div>
    </form>
  );
};

export default Form;

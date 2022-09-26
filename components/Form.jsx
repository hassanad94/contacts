import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useStateContext } from "../context/settingContext";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

const Form = (...props) => {
  const { setContacts } = useStateContext();
  const [loading, setLoading] = useState(true);

  const { title, personID, modalSetting } = props[0];

  const [initPreviewImageURL, setInitPreviewImageURL] = useState(
    "/img/empty-profile.png"
  );

  const closeModal = () => {
    modalSetting(false);
  };

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

    closeModal();
  };
  const fileInput = useRef();

  const [uploadImgURL, setUploadImgURL] = useState(initPreviewImageURL);
  const [showImageError, setShowImageError] = useState(false);

  const [formFieldsValues, setformFieldsValues] = useState({
    name: "",
    phone: "",
    email: "",
    image: null,
  });

  const getPerson = useCallback(async () => {
    await fetch("/api/contacts/get", {
      method: "POST",
      body: JSON.stringify({ contactID: personID }),
    })
      .then((r) => r.json())
      .then((data) => {
        const { name, formatedPhone: phone, email, image } = data.person[0];
        setUploadImgURL(image);
        setInitPreviewImageURL(image);

        setformFieldsValues({ name, phone, email, image });

        setLoading(false);
      });
  }, [personID]);

  useEffect(() => {
    if (personID) {
      getPerson();
      return;
    }

    setLoading(false);
  }, [getPerson, personID]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (uploadImgURL === initPreviewImageURL && !personID) {
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

    const uploadMethod = personID ? "update" : "add";

    if (personID) data.append("id", personID);

    const response = await fetch(`/api/contacts/${uploadMethod}`, {
      method: "POST",
      body: data,
    })
      .then((r) => r.json())
      .then((data) => handleFormUploadResponse(data));
  };

  if (!loading) {
    return (
      <>
        <h2 className="modal-title mb-[20px]">{title}</h2>
        <form id="uploadForm" onSubmit={(e) => handleOnSubmit(e)}>
          <div className="input-container mb-[20px] image-upload-container flex items-center">
            <Image
              src={uploadImgURL}
              alt="Profile Image"
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
              {uploadImgURL === initPreviewImageURL && !personID ? (
                <>
                  <span className="text-[18px] mr-[6px] md:mr-[8px]">+</span>{" "}
                  Add picture
                </>
              ) : (
                <>
                  <>
                    <span className="p-[0px] leading-[1] mr-[2px]">
                      <Image
                        src="/img/change.png"
                        alt="change"
                        className="object-contain"
                        width={20}
                        height={20}
                      />
                    </span>{" "}
                    <span className="leading-[20px]">Change pitcure</span>
                  </>
                </>
              )}
            </Button>

            {uploadImgURL !== initPreviewImageURL && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setUploadImgURL(initPreviewImageURL)}
                  className="flex flex-row w-[auto] min-w-fit align-center ml-[8px] p-[8px] inline-block bg-[#2D2D2D] rounded-[8px]"
                >
                  <Image
                    src="/img/del.svg"
                    alt="delete"
                    className="object-contain mr-[15px]"
                    width={20}
                    height={20}
                  />
                </Button>
              </>
            )}

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
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
                setformFieldsValues((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
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
                setformFieldsValues((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              name="phone"
              label="Phone"
              placeholder="+36 31 781 0260"
              // inputProps={{
              //   pattern: "[0-9 +]{15}",
              //   title: "36707864231",
              // }}
              autoComplete="none"
              required
            />
          </div>

          <div className="input-container mb-[20px]">
            <CssTextField
              value={formFieldsValues.email}
              onChange={(e) => {
                setformFieldsValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
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
                closeModal();
              }}
              className="text-[#fff] p-[8px_16px] mr-[20px] rounded-[8px]"
              type="button"
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
      </>
    );
  }
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          bgcolor: "transparent",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Form;

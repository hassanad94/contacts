import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useStateContext } from "../context/settingContext";

const Form = () => {
  const fileInput = useRef();
  const { setOpenModal } = useStateContext();

  const [uploadImgURL, setUploadImgURL] = useState("/img/empty-profile.png");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

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

  const profileImage = document.getElementById("imageUpload");

  const onSubmit = (data) => {
    data.image = profileImage.files[0];
    console.log(data);
  };

  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [profileImage.files[0].name]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container mb-[20px] image-upload-container flex items-center">
        <Image
          src={uploadImgURL}
          className="rounded-full mr-[15px]"
          width={88}
          height={88}
          id=""
        />

        <Controller
          name="profileImg"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
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
                {...field}
                ref={fileInput}
                type="file"
                id="imageUpload"
                value={""}
                className="hidden"
                onChange={() => {
                  setUploadImgURL(
                    window.URL.createObjectURL(fileInput.current.files[0])
                  );
                }}
              />
            </>
          )}
        />
      </div>

      <div className="input-container mb-[20px]">
        {" "}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <CssTextField
                {...field}
                autoComplete="off"
                label="Name"
                required
              />
            </>
          )}
        />
      </div>

      <div className="input-container mb-[20px]">
        {" "}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <>
              <CssTextField
                {...field}
                autoComplete="off"
                label="Phone"
                required
              />
            </>
          )}
        />
      </div>

      <div className="input-container mb-[20px]">
        {" "}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <CssTextField
                {...field}
                autoComplete="off"
                label="Email"
                type="email"
                required
              />
            </>
          )}
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

import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Context.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

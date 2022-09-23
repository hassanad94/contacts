import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const [contacts, setContacts] = useState([]);

  return (
    <Context.Provider
      value={{
        openModal,
        setOpenModal,
        contacts,
        setContacts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

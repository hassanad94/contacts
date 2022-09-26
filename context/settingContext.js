import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  return (
    <Context.Provider
      value={{
        contacts,
        setContacts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

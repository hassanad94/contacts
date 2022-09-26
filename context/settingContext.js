import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  //getDAta + useEffect Only because i can not fetch data from local host due too build issue
  const getData = useCallback(async () => {
    const allContactAPIRoute = "http://localhost:3000/api/contacts/getAll";

    const contactList = await (
      await fetch(allContactAPIRoute, { method: "POST" })
    ).json();

    setContacts(contactList);
  });

  useEffect(() => {
    getData();
  }, [getData]);

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

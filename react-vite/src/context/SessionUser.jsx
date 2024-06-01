import { useState, useContext, createContext } from "react";

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext)

export default function UserProvider(props) {
  const [user, setUser] = useState(null);


  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {props.children}
    </SessionContext.Provider>
  )
}
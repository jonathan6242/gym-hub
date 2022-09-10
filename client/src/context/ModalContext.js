import { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  return <ModalContext.Provider value={{
    sidebarOpen,
    setSidebarOpen,
  }}>
    { children }
  </ModalContext.Provider>
}

export default ModalContext
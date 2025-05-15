import React, { createContext, useState } from 'react';

export const authContext = createContext();
export const cartContext = createContext();
export const gadgetResponseContext = createContext();

const ContextApi = ({ children }) => {
  const [auth, setAuth] = useState(!!sessionStorage.getItem('token'));
  const [contextRole, setContextRole] = useState(sessionStorage.getItem('role') || null);
  const [cart, setCart] = useState([]);
  const [gadgetResponse, setGadgetResponse] = useState({});

  return (
    <authContext.Provider value={{ auth, setAuth, contextRole, setContextRole }}>
      <cartContext.Provider value={{ cart, setCart }}>
        <gadgetResponseContext.Provider value={{ gadgetResponse, setGadgetResponse }}>
          {children}
        </gadgetResponseContext.Provider>
      </cartContext.Provider>
    </authContext.Provider>
  );
};

export default ContextApi;
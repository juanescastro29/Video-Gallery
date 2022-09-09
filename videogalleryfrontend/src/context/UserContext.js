import React from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const IS_SESSION = "session";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState({});
  const [session, setSession] = useState(false)

  const login = useCallback(async function ({ data }) {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dataBackend = await response.text();
    
    if (dataBackend !== "Password" && dataBackend !== "Not registered") {
      window.localStorage.setItem(IS_SESSION, true);
      setSession(true);
      const responseUser = await fetch(`http://localhost:8000/user/${dataBackend}`)
      const dataUser = await responseUser.json();
      setUser(dataUser);
    }
    
    }, [],)

  const logout = useCallback(function () {
    window.localStorage.removeItem(IS_SESSION);
    setSession(false);
    setUser(null);
  }, [],)
  
  const values = useMemo(() => ({
    
    session
  }), [ session])

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

UserProvider.protoTypes = {
  children: PropTypes.object
}

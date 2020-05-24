import React, { useState, useEffect } from "react";

const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = (props) => {
  const [token, setToken] = useState("");
  const [eleveId, setEleveId] = useState("");

  const [expoPushToken, setExpoPushToken] = useState(
    "ExponentPushToken[QgIEbWKYkGW_aMuVKv6EhS]"
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(" ");

  useEffect(() => {
    let timer = setTimeout(() => setError(" "), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <Provider
      value={{
        username,
        password,
        token,
        eleveId,
        setUsername,
        setPassword,
        setToken,
        setEleveId,
        error,
        setError,
        expoPushToken,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { UserContext, UserProvider };

import React, { useState } from "react";

const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = (props) => {
  const [token, setToken] = useState("");
  const [eleveId, setEleveId] = useState("");

  const [expoPushToken, setExpoPushToken] = useState(
    "ExponentPushToken[QgIEbWKYkGW_aMuVKv6EhS]"
  );
  const [username, setUsername] = useState("Toutane");
  const [password, setPassword] = useState("cec3Nad5te");

  return (
    <Provider
      value={{
        username,
        password,
        token,
        eleveId,
        setToken,
        setEleveId,
        expoPushToken,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { UserContext, UserProvider };

import React, { useState, useEffect } from "react";
import { Notifications } from "expo";

const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = (props) => {
  const [token, setToken] = useState("");
  const [eleveId, setEleveId] = useState("");

  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    async function getNotifToken() {
      notifToken = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(notifToken);
    }
    getNotifToken();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({
    username: "",
    profile: { classe: {} },
  });

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
        userData,
        setUserData,
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

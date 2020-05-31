import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage, AppState } from "react-native";

import { UserContext } from "./userContext";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const url = "https://api.ecoledirecte.com";

const AuthProvider = (props) => {
  useEffect(() => {
    _retrieveData();
  }, []);

  const [appState, setAppState] = useState(AppState.currentState);

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    username,
    password,
    token,
    setUsername,
    setPassword,
    setToken,
    setEleveId,
    setError,
  } = useContext(UserContext);

  async function login() {
    let data = `data={ "identifiant": "${username}", "motdepasse": "${password}", "token": "${token}" }`;

    await setLoading(true);

    let response = await fetch(`${url}/v3/login.awp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/edn",
      },
      body: data,
    });

    let result = await response.json();

    result.code === 200
      ? (console.log(
          `Successfully authenticated, eleveId: ${
            result.data.accounts[0].id
          }, token: ${result.token.slice(0, 10)}...${result.token.substr(
            result.token.length - 10
          )} `
        ),
        setAuthenticated(true),
        setLoading(false),
        setToken(result.token),
        setEleveId(result.data.accounts[0].id),
        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            authenticated: true,
            username: username,
            password: password,
            token: result.token,
            eleveId: result.data.accounts[0].id,
          })
        ))
      : (console.log(`Failed to authenticated, error code: ${result.code}`),
        setError(result.message),
        setLoading(false));
  }

  function logout() {
    setAuthenticated("");
    // setToken("");
    setEleveId("");
    setUsername("");
    setPassword("");
    AsyncStorage.setItem(
      "auth",
      JSON.stringify({
        authenticated: false,
        username: "",
        password: "",
        token: "",
        eleveId: "",
      })
    );
  }

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("auth");
      if (value !== null) {
        let result = await JSON.parse(value);
        setAuthenticated(result.authenticated);
        setUsername(result.username);
        setPassword(result.password);
        setToken(result.token);
        setEleveId(result.eleveId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{ authenticated, loading, login, logout, appState, setAppState }}
    >
      {props.children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

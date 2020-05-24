import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { UserContext } from "./userContext";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const url = "https://api.ecoledirecte.com";

const AuthProvider = (props) => {
  useEffect(() => {
    _retrieveData();
  }, []);

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, password, setUsername, setToken, setEleveId } = useContext(
    UserContext
  );

  async function login() {
    let data = `data={ "identifiant": "${username}", "motdepasse": "${password}" }`;

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
          }, token: ${result.token.slice(0, 10)}... `
        ),
        setAuthenticated(true),
        setLoading(false),
        setToken(result.token),
        setEleveId(result.data.accounts[0].id),
        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            authenticated: true,
            username: "Toutane",
            token: result.token,
            eleveId: result.data.accounts[0].id,
          })
        ))
      : console.log(`Failed to authenticated, error code: ${result.code}`);
  }

  function logout() {
    setAuthenticated("");
    setToken("");
    setEleveId("");
    AsyncStorage.setItem(
      "auth",
      JSON.stringify({
        authenticated: false,
        username: "Toutane",
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
        setToken(result.token);
        setEleveId(result.eleveId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider value={{ authenticated, loading, login, logout }}>
      {props.children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

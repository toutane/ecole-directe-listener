import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { UserContext } from "./userContext";
import { LogsContext } from "./logsContext";

// const url = "http://192.168.86.183:3000/api";
const url = "https://edl-core.toutane.now.sh/api";

const ListenContext = React.createContext();
const { Provider } = ListenContext;

const ListenProvider = (props) => {
  useEffect(() => {
    _retrieveData();
    // AsyncStorage.setItem(
    //   "listen",
    //   JSON.stringify({
    //     isListening: false,
    //     listenItem: { cronId: "" },
    //   })
    // );
  }, []);

  const {
    username,
    password,
    token,
    eleveId,
    expoPushToken,
    setError,
  } = useContext(UserContext);
  const { newLog, setLogs } = useContext(LogsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [listenItem, setListenItem] = useState({ cronId: "" });

  const [interval, setIntervalNum] = useState(`*/10 * * * *`);

  async function startListening() {
    setIsLoading(true);
    let response = await fetch(
      `${url}/start?interval=${interval}&token=${token}&eleveId=${eleveId}&username=${username}&password=${password}&expoPushToken=${expoPushToken}`,
      {
        method: "GET",
      }
    );

    let result = await response.json();
    result.status === "success"
      ? (setIsListening(true),
        setListenItem(Object.assign({}, { cronId: result.cron_job_id })),
        AsyncStorage.setItem(
          "listen",
          JSON.stringify({
            isListening: true,
            listenItem: Object.assign(
              {},
              {
                cronId: result.cron_job_id,
              }
            ),
          })
        ),
        newLog("start", result))
      : (setIsListening(false),
        setError(result.error.message),
        newLog("start", result));
    setIsLoading(false);
  }

  async function stopListening(cronId, item) {
    setIsLoading(true);
    let response = await fetch(`${url}/stop?id=${cronId}`, {
      method: "GET",
    });

    let result = await response.json();
    result.status === "success"
      ? (setIsListening(false),
        AsyncStorage.setItem(
          "listen",
          JSON.stringify({
            isListening: false,
            listenItem: { cronId: "" },
          })
        ),
        newLog("stop", result, item))
      : (setError(result.error), newLog("stop", result, item));
    setIsLoading(false);
    setListenItem({ cronId: "" });
    setError(" ");
  }

  async function getListenInfo(isForStop) {
    setIsLoading(true);
    let response = await fetch(`${url}/info?eleveId=${eleveId}`, {
      method: "GET",
    });
    let result = await response.json();
    setListenItem(result);
    setIsLoading(false);
    isForStop ? stopListening(result.cronId, result) : null;
  }

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("listen");
      if (value !== null) {
        let result = await JSON.parse(value);
        setIsListening(result.isListening);
        setListenItem(result.listenItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        interval,
        setIntervalNum,
        listenItem,
        isLoading,
        isListening,
        startListening,
        getListenInfo,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { ListenContext, ListenProvider };

import React, { useState, useEffect, useContext } from "react";
import { deployementId, buildId, bearerToken } from "../config/vercel-keys";
import { AuthContext } from "./authContext";

const LogsContext = React.createContext();
const { Provider } = LogsContext;

const LogsProvider = (props) => {
  const { appState } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogsLoading, setIsLogsLoading] = useState(false);

  const [logs, setLogs] = useState([]);
  const [buildLogs, setBuildLogs] = useState([]);
  const [serverStatus, setServerStatus] = useState([]);

  useEffect(() => {
    async function getServerStatus() {
      setIsLoading(true);
      let url = `https://api.vercel.com`;
      let response = await fetch(`${url}/v7/now/deployments/${deployementId}`, {
        method: "GET",
        headers: { authorization: `bearer ${bearerToken}` },
      });
      let result = await response.json();
      result.error === undefined
        ? setServerStatus(result)
        : console.log(result.error);
      setIsLoading(false);
    }
    getServerStatus();
  }, [appState]);

  useEffect(() => {
    async function getBuildLogs() {
      setIsLogsLoading(true);
      let url = `https://api.vercel.com`;
      let response = await fetch(
        `${url}/v2/now/deployments/${deployementId}/events?name=${buildId}`,
        {
          method: "GET",
          headers: { authorization: `bearer ${bearerToken}` },
        }
      );

      let result = await response.json();
      result.error === undefined
        ? setBuildLogs(result)
        : console.log(result.error);
      setIsLogsLoading(false);
    }
    getBuildLogs();
  }, [appState]);

  async function newLog(type, payload, item) {
    setLogs((prvState) =>
      prvState.concat(
        type === "start"
          ? [
              {
                index: logs.length === 0 ? 1 : logs[logs.length - 1].index + 1,
                created: new Date(),
                status: payload.status,
                code: payload.status === "success" ? 200 : payload.code,
                type: "api/start",
                message: "Start listening",
                text:
                  payload.status === "success"
                    ? `↪ Cron Id: ${payload.cron_job_id} `
                    : payload.message,
              },
            ]
          : type === "stop"
          ? [
              {
                index: logs.length === 0 ? 1 : logs[logs.length - 1].index + 1,
                created: new Date(),
                status: payload.status,
                code: payload.status === "success" ? 200 : payload.code,
                type: "api/stop",
                message: "Stop listening",
                text:
                  payload.status === "success"
                    ? `↪ Cron Id: ${item.cronId}\n↪ Short Id: ${item.shortId}\n↪ ${item.num} fetch(s)\n↪ Updated: ${item.updated} time(s)`
                    : payload.message,
              },
              { code: 111, index: 0 },
            ]
          : [{}]
      )
    );
  }

  return (
    <Provider
      value={{
        isLoading,
        logs,
        setLogs,
        newLog,
        buildLogs,
        serverStatus,
        isLogsLoading,
      }}
    >
      {props.children}
    </Provider>
  );
};

export { LogsContext, LogsProvider };

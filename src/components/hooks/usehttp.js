import { use } from "react";
import { useState, useCallback, useEffect } from "react";

async function httpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Request failed!");
  }
  return resData;
}

function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const response = await httpRequest(url, {
        method: config.method ? config.method : "GET",
        headers: config.headers ? config.headers : {},
        body: data ? JSON.stringify(data) : null,
      });
      setData(response);
    } catch (error) {
      setError(error.message || "Request failed!");
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(()=>{
    if (config && (config.method === "GET" || !config.method)) {
    sendRequest();
    }
  },[sendRequest]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
  };
}

export default useHttp;

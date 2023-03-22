import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = useState("hello");
  const router = useRouter();
  const callApi = async () => {
    try {
      const response = await fetch(process.env.LOGIN_ROOT, requestOptions);
      if (response.status === 200) {
        setData(await response.json());
      } else if (response.status === 401) {
        const {
          error,
          data: { URL },
        } = await response.json();
        if (!error && URL) window.location.href = URL;
        else console.log("Invalid redirect URL");
      } else {
        console.log("handle other response status codes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  let requestOptions = {
    method: "GET",
    headers: headers,
    credentials: "include",
  };

  useEffect(() => {
    callApi();
    if (data) {
      router.push("/name-enquiry");
    }
  }, [data]);
}
export { data };

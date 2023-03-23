import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = useState("null");
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
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.container}>
          <Head>
            <title>Ecobank Name Enquiry</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <h1 className={styles.title}>
            <img className={styles.image} src="/portal/name-enquiry/images/ecobank.png" />
          </h1>

          <main>
            <div className={styles.grid}>
              <h1 className={styles.heading}>Account Name Enquiry</h1>
              <form action="" method="post">
              <TextareaAutosize
                className={styles.textarea}
                maxRows={4}
                minRows={4}
                placeholder="Institution ID | Account Number"
                defaultValue=""
                style={{ width: 300 }}
              />
              <button className={styles.button} type="submit">
                Submit
              </button>
              </form>
            </div>
          </main>

          <footer>Powered by Ecobank Ghana PLC</footer>

          <style jsx>{`
            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            footer img {
              margin-left: 0.5rem;
            }
            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              color: inherit;
            }
            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
}

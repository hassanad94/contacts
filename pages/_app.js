import "../styles/globals.css";
import { StateContext } from "../context/settingContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
export default MyApp;

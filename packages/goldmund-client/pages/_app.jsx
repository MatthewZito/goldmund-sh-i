import Router from "next/router";
import NProgress from "nprogress";
import "../styles/index.min.css";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

/* Listeners for loading animation */
Router.events.on("routeChangeStart", () => {
    NProgress.start()
})

Router.events.on("routeChangeComplete", () => {
    NProgress.done()
})

Router.events.on("routeChangeError", () => {
    NProgress.done()
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
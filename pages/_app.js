import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css'
import '../styles/site.scss'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify' //npm i react-toastify

import { isMobile } from "react-device-detect"; //npm install react-device-detect //https://www.npmjs.com/package/react-device-detect

function MyApp({ Component, pageProps }) {
  return <Fragment>
    
      <Component {...pageProps} />

      <ToastContainer

        position={ isMobile ? 'top-center' : 'top-left' }
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={true}
        theme="colored"
        />

    </Fragment>
}

export default MyApp

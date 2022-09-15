import { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/animateNew.css'
import '../styles/globals.css'
import '../styles/site.scss'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify' //npm i react-toastify
import { useRouter } from 'next/router';
import { isMobile } from "react-device-detect"; //npm install react-device-detect //https://www.npmjs.com/package/react-device-detect
import Layout from "../components/layout/layout";
import {  getSession } from 'next-auth/client';

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  //console.log('router', router);

  //LoginPageRoute
  if(router.pathname === '/') {

    //Login Layout
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

  const [userData, setUserData] = useState(false);

  //get session data info
  useEffect(() => {
    
    getSession().then(session => {

        setUserData(session);

    })

  }, [])

  //User Console Layout
  return <Fragment>

      <Layout userData = { userData } >
        <Component {...pageProps}  />
      </Layout>

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

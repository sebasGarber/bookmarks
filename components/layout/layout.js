import { Fragment, useEffect, useState } from 'react';
import MainNavigation from './main-navigation';
import {  getSession } from 'next-auth/client';
import Loading from '../utils/Loading';
import Head from 'next/head'

function Layout(props) {


    const [userData, setUserData] = useState(false);

    //get session data info
    useEffect(() => {
    
      getSession().then(session => {
  
          setUserData(session);
  
      })
  
    }, [])

    if(!userData) {
      return <Loading open={true}/>
    }


    return (
      <Fragment>

        <Head>

          <title>Bookmarks</title>
          
          <meta name="description" content="Bookmarks System by Sebas" />
          
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="og:image" content="https://bookmarks-sebas.vercel.app/img/maxresdefault.jpg" />
          <meta name="canonical" content="https://bookmarks-sebas.vercel.app" />

          <link rel="icon" href="/favicon.ico" />

        </Head>

        <MainNavigation  userData = { userData } />
        
        <main>{props.children}</main>
        
      </Fragment>
    );
}

export default Layout;

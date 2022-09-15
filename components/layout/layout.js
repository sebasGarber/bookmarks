import { Fragment, useEffect, useState } from 'react';
import MainNavigation from './main-navigation';
import {  getSession } from 'next-auth/client';
import Loading from '../utils/Loading';


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
        <MainNavigation  userData = { userData } />
        <main>{props.children}</main>
      </Fragment>
    );
}

export default Layout;

import React, { useEffect } from 'react'
import {  getSession } from 'next-auth/client'; //npm install --save-exact next-auth@3
import NewUserPage from '../../components/views/newUserLogin';

export default function index(props) {

  //console.log(props);
  const { userData  } = props

  return (
    
    <div className='user-console-index'>

      <NewUserPage userData = {userData} />

    </div>
  )
}

//No session go Out...
export async function getServerSideProps(context) {

    const session = await getSession({req: context.req});
  
    if(!session) {
      return {
        //notFound: true,
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  
    return {
      props: { userData : session }
    }
    
  
  }